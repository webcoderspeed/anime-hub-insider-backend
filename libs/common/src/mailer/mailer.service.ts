import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import {
  NODEMAILER_EMAIL,
  NODEMAILER_PASSWORD,
} from '../constants/mail.constant';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  cc?: string[];
}

@Injectable()
export class MailerService {
  constructor(private readonly configService: ConfigService) {}

  async sendMail({ to, subject, html, cc }: EmailOptions) {
    const transporter = nodemailer.createTransport({
      host: 'smtpout.secureserver.net',
      secure: true,
      tls: { ciphers: 'SSLv3' },
      requireTLS: true,
      port: 465,
      debug: true,
      auth: {
        user: this.configService.getOrThrow(NODEMAILER_EMAIL),
        pass: this.configService.getOrThrow(NODEMAILER_PASSWORD),
      },
    });

    const mailOptions = {
      from: `Innovations emrez <${this.configService.getOrThrow(NODEMAILER_EMAIL)}>`,
      to,
      subject,
      html,
      cc: cc ? cc : undefined,
    };

    try {
      const info = await transporter.sendMail(mailOptions);

      console.log('MailerService: ', info.response);

      return info.response;
    } catch (error) {
      console.error('Error sending email:', error);

      throw new InternalServerErrorException(
        'There was an error sending the email. Please try again later.',
      );
    }
  }
}
