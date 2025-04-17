import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { AbstractDocument } from '../database';

@Schema({
  collection: 'settings',
  versionKey: false,
  timestamps: true,
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  },
})
export class Settings extends AbstractDocument {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({ default: 'system' })
  theme: string; // 'light', 'dark', 'system'

  @Prop({ default: 'medium' })
  fontSize: string;

  @Prop({ default: true })
  showEpisodeThumbnails: boolean;

  @Prop({ default: true })
  showAnimeRatings: boolean;

  @Prop({ default: false })
  compactView: boolean;

  @Prop({ default: false })
  showNSFWContent: boolean;

  @Prop({ default: true })
  autoplayNextEpisode: boolean;

  @Prop({ default: '1080p' })
  defaultQuality: string;

  @Prop({ default: 50 })
  defaultVolume: number;

  @Prop({ default: true })
  skipIntro: boolean;

  @Prop({ default: true })
  skipOutro: boolean;

  @Prop({ default: true })
  showSubtitles: boolean;

  @Prop({ default: 'English' })
  subtitleLanguage: string;

  @Prop({ default: 'medium' })
  subtitleFontSize: string;

  @Prop({ default: 0.5 })
  subtitleBackgroundOpacity: number;

  @Prop({ default: true })
  notifyNewEpisodes: boolean;

  @Prop({ default: true })
  notifyNewSeasons: boolean;

  @Prop({ default: true })
  notifyRecommendations: boolean;

  @Prop({ default: false })
  notifyForumReplies: boolean;

  @Prop({ default: false })
  newsletter: boolean;
}
export const SettingsSchema = SchemaFactory.createForClass(Settings);
