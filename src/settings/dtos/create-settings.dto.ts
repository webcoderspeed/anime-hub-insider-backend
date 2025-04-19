import { IsString, IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class CreateSettingsDto {
  @IsString()
  user: string;

  @IsString()
  @IsOptional()
  theme?: string;

  @IsString()
  @IsOptional()
  fontSize?: string;

  @IsBoolean()
  @IsOptional()
  showEpisodeThumbnails?: boolean;

  @IsBoolean()
  @IsOptional()
  showAnimeRatings?: boolean;

  @IsBoolean()
  @IsOptional()
  compactView?: boolean;

  @IsBoolean()
  @IsOptional()
  showNSFWContent?: boolean;

  @IsBoolean()
  @IsOptional()
  autoplayNextEpisode?: boolean;

  @IsString()
  @IsOptional()
  defaultQuality?: string;

  @IsNumber()
  @IsOptional()
  defaultVolume?: number;

  @IsBoolean()
  @IsOptional()
  skipIntro?: boolean;

  @IsBoolean()
  @IsOptional()
  skipOutro?: boolean;

  @IsBoolean()
  @IsOptional()
  showSubtitles?: boolean;

  @IsString()
  @IsOptional()
  subtitleLanguage?: string;

  @IsString()
  @IsOptional()
  subtitleFontSize?: string;

  @IsNumber()
  @IsOptional()
  subtitleBackgroundOpacity?: number;

  @IsBoolean()
  @IsOptional()
  notifyNewEpisodes?: boolean;

  @IsBoolean()
  @IsOptional()
  notifyNewSeasons?: boolean;

  @IsBoolean()
  @IsOptional()
  notifyRecommendations?: boolean;

  @IsBoolean()
  @IsOptional()
  notifyForumReplies?: boolean;

  @IsBoolean()
  @IsOptional()
  newsletter?: boolean;
}
