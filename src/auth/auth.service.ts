import {
  AuthRepository,
  MailerService,
  User,
  UsersRepository,
  getWelcomeEmailTemplate,
} from '@app/common';
import { ITokenPayload } from '@app/common/types';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { compare, hash } from 'bcryptjs';
import {
  AUTH_UI_REDIRECT,
  JWT_ACCESS_TOKEN_EXPIRATION_MS,
  JWT_ACCESS_TOKEN_SECRET,
  JWT_REFRESH_TOKEN_EXPIRATION_MS,
  JWT_REFRESH_TOKEN_SECRET,
  USER_POPULATED_FIELDS,
} from '@app/common/constants';
import { RegisterUserDto } from './dtos/register-user.dto';
import { Types } from 'mongoose';
import { ChangePasswordDto } from './dtos/change-password.dto';
import { ForgotPasswordDto } from './dtos/forgot-password.dto';
import { createHash, randomBytes } from 'crypto';
import getPasswordResetEmailTemplate from '@app/common/mailer/templates/get-password-reset-email.template';
import { ResetPasswordDto } from './dtos/reset-password.dto';

const { ObjectId } = Types;

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly userRepository: UsersRepository,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) {}

  async login(user: User, response: Response, redirect = false) {
    const expiresAccessToken = new Date();
    expiresAccessToken.setMilliseconds(
      expiresAccessToken.getTime() +
        parseInt(
          this.configService.getOrThrow<string>(JWT_ACCESS_TOKEN_EXPIRATION_MS),
        ),
    );

    const expiresRefreshToken = new Date();
    expiresRefreshToken.setMilliseconds(
      expiresRefreshToken.getTime() +
        parseInt(
          this.configService.getOrThrow<string>(
            JWT_REFRESH_TOKEN_EXPIRATION_MS,
          ),
        ),
    );

    const tokenPayload: ITokenPayload = {
      user: user._id.toHexString(),
      role: user.role,
    };

    const accessToken = this.jwtService.sign(tokenPayload, {
      secret: this.configService.getOrThrow(JWT_ACCESS_TOKEN_SECRET),
      expiresIn: `${this.configService.getOrThrow(
        JWT_ACCESS_TOKEN_EXPIRATION_MS,
      )}ms`,
    });
    const refreshToken = this.jwtService.sign(tokenPayload, {
      secret: this.configService.getOrThrow(JWT_REFRESH_TOKEN_SECRET),
      expiresIn: `${this.configService.getOrThrow(
        JWT_REFRESH_TOKEN_EXPIRATION_MS,
      )}ms`,
    });

    await this.authRepository.findOneAndUpdate(
      { user: user._id },
      { $set: { refreshToken: await hash(refreshToken, 10) } },
    );

    response.cookie('Authentication', accessToken, {
      httpOnly: true,
      secure: this.configService.get('NODE_ENV') === 'production',
      expires: expiresAccessToken,
    });
    response.cookie('Refresh', refreshToken, {
      httpOnly: true,
      secure: this.configService.get('NODE_ENV') === 'production',
      expires: expiresRefreshToken,
    });

    if (redirect) {
      response.redirect(this.configService.getOrThrow(AUTH_UI_REDIRECT));
    }
  }

  async register(user: RegisterUserDto) {
    const existingUser = await this.userRepository.findOne({
      email: user.email,
    });

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const createdUser = await this.userRepository.create({
      ...user,
      avatar: user?.avatar ? new ObjectId(user?.avatar) : null,
    });

    if (!createdUser) {
      throw new InternalServerErrorException('Registration failed');
    }

    await this.authRepository.create({
      user: createdUser._id,
      passwordHash: await hash(user.password, 10),
    });

    try {
      await this.mailerService.sendMail({
        to: user.email,
        subject:
          'Welcome to Anime Hub Insider - Your Go-To Anime Streaming Platform!',
        html: getWelcomeEmailTemplate({
          name: user.name,
        }),
      });
    } catch (error) {
      console.log(error);
    }
  }

  async verifyUser(email: string, password: string) {
    try {
      const user = await this.userRepository.findOne({
        email,
        isDeleted: false,
        isActive: true,
      });

      if (!user) {
        throw new NotFoundException('User with given email not exists');
      }

      const auth = await this.authRepository.findOne({
        user: user._id,
      });

      const authenticated = await compare(password, auth.passwordHash);
      if (!authenticated) {
        throw new UnauthorizedException();
      }
      return user;
    } catch (err) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async getUser({ userId }: { userId: string }) {
    const user = await this.userRepository.findOne(
      {
        _id: new ObjectId(userId),
        isDeleted: false,
        isActive: true,
      },
      USER_POPULATED_FIELDS,
    );

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async veryifyUserRefreshToken(refreshToken: string, userId: string) {
    try {
      const auth = await this.authRepository.findOne({
        user: new ObjectId(userId),
      });

      const authenticated = await compare(refreshToken, auth.refreshToken);

      if (!authenticated) {
        throw new UnauthorizedException();
      }

      const user = await this.userRepository.findOne({
        _id: new ObjectId(userId),
        isDeleted: false,
        isActive: true,
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return user;
    } catch (err) {
      throw new UnauthorizedException('Refresh token is not valid.');
    }
  }

  async logout(user: User, response: Response) {
    await this.authRepository.findOneAndUpdate(
      { user: user._id },
      { $set: { refreshToken: null } },
    );
    response.clearCookie('Authentication');
    response.clearCookie('Refresh');
  }

  async changePassword(user: User, changePasswordDto: ChangePasswordDto) {
    try {
      const auth = await this.authRepository.findOne({
        user: user._id,
      });

      const authenticated = await compare(
        changePasswordDto.oldPassword,
        auth.passwordHash,
      );
      if (!authenticated) {
        throw new UnauthorizedException('Invalid credentials');
      }

      await this.authRepository.findOneAndUpdate(
        { user: user._id },
        {
          $set: {
            passwordHash: await hash(changePasswordDto.newPassword, 10),
          },
        },
      );
    } catch (err) {
      throw err;
    }
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const user = await this.userRepository.findOne({
      email: forgotPasswordDto.email,
    });
    if (!user) {
      throw new NotFoundException('User with given email not exists');
    }

    const resetToken = randomBytes(32).toString('hex');

    const TEN_MINTUES = 10 * 60 * 1000;
    const CURRENT_DATE = Date.now();

    const expires = new Date(CURRENT_DATE + TEN_MINTUES);

    await this.authRepository.findOneAndUpdate(
      { user: user._id },
      {
        $set: {
          passwordResetToken: resetToken,
          passwordResetExpires: expires,
        },
      },
    );

    const resetUrl = `${this.configService.getOrThrow(
      AUTH_UI_REDIRECT,
    )}/reset-password/${resetToken}`;

    try {
      await this.mailerService.sendMail({
        to: forgotPasswordDto.email,
        subject: 'YOUR RESET PASSWORD REQUEST',
        html: getPasswordResetEmailTemplate(user.name, resetUrl),
      });
    } catch (err) {
      await this.authRepository.findOneAndUpdate(
        { user: user._id },
        {
          $set: {
            passwordResetToken: null,
            passwordResetExpires: null,
          },
        },
      );
      throw err;
    }
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const hashedToken = createHash('sha256')
      .update(resetPasswordDto.resetToken)
      .digest('hex');

    const auth = await this.authRepository.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!auth) {
      throw new NotFoundException('Invalid reset token');
    }

    if (resetPasswordDto.password !== resetPasswordDto.confirmPassword) {
      throw new BadRequestException(
        `Password: ${resetPasswordDto.password} and confirmPassword: ${resetPasswordDto.confirmPassword} do not match`,
      );
    }

    await this.authRepository.findOneAndUpdate(
      { user: auth.user },
      {
        $set: {
          passwordHash: await hash(resetPasswordDto.password, 10),
          passwordResetToken: null,
          passwordResetExpires: null,
        },
      },
    );
  }
}
