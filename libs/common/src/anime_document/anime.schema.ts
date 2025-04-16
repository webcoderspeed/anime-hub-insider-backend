import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  Recommendation,
  RecommendationSchema,
} from '../recommendation_document';
import { Relation, RelationSchema } from '../relation_document';
import { Episode, EpisodeSchema } from '../episode_document';
import { AbstractDocument } from '../database';
import { Genre, GenreSchema } from '../genre_document';

@Schema({
  collection: 'users',
  versionKey: false,
  timestamps: true,
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  },
})
export class Anime extends AbstractDocument {
  @Prop({ required: true, unique: true })
  title: string;

  @Prop()
  image: string;

  @Prop()
  cover: string;

  @Prop()
  description: string;

  @Prop({ type: [GenreSchema], default: [] })
  genres: Genre[];

  @Prop()
  hasSub: boolean;

  @Prop()
  status: string;

  @Prop()
  type: string;

  @Prop()
  releaseDate: string;

  @Prop({ type: [String] })
  studios: string[];

  @Prop()
  totalEpisodes: number;

  @Prop({ type: [RecommendationSchema], default: [] })
  recommendations: Recommendation[];

  @Prop({ type: [RelationSchema], default: [] })
  relations: Relation[];

  @Prop({ type: [EpisodeSchema], default: [] })
  episodes: Episode[];

  @Prop()
  episodePages: number;
}
export const AnimeSchema = SchemaFactory.createForClass(Anime);
