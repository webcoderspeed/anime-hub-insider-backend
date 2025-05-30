import { Logger } from '@nestjs/common';
import {
  FilterQuery,
  Model,
  Types,
  UpdateQuery,
  SaveOptions,
  Connection,
  PopulateOptions,
  Aggregate,
  PipelineStage,
} from 'mongoose';
import { AbstractDocument } from './abstract.schema';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  protected abstract readonly logger: Logger;

  constructor(
    protected readonly model: Model<TDocument>,
    private readonly connection: Connection,
  ) {}

  async create(
    document: Omit<TDocument, '_id'>,
    options?: SaveOptions,
  ): Promise<TDocument> {
    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });
    return (
      await createdDocument.save(options)
    ).toJSON() as unknown as TDocument;
  }

  async findOne(
    filterQuery: FilterQuery<TDocument>,
    populateOptions?: PopulateOptions | Array<string | PopulateOptions>,
  ): Promise<TDocument | null> {
    let query = this.model.findOne(filterQuery);

    if (populateOptions) {
      query = query.populate(populateOptions);
    }

    const document = await query.exec();
    return document ? (document.toObject() as TDocument) : null;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
  ) {
    const document = await this.model.findOneAndUpdate(filterQuery, update, {
      lean: true,
      new: true,
    });

    return document;
  }

  async upsert(
    filterQuery: FilterQuery<TDocument>,
    document: Partial<TDocument>,
  ) {
    return this.model.findOneAndUpdate(filterQuery, document, {
      lean: true,
      upsert: true,
      new: true,
    });
  }

  async find(filterQuery: FilterQuery<TDocument>) {
    return this.model.find(filterQuery, {}, { lean: true });
  }

  // --- Add this method ---
  findQuery(filterQuery: FilterQuery<TDocument>) {
    return this.model.find(filterQuery);
  }

  async startTransaction() {
    const session = await this.connection.startSession();
    session.startTransaction();
    return session;
  }

  async deleteOne(filterQuery: FilterQuery<TDocument>) {
    return this.model.deleteOne(filterQuery);
  }

  async countDocuments(filterQuery: FilterQuery<TDocument>) {
    return this.model.countDocuments(filterQuery);
  }

  async aggregate(pipeline: PipelineStage[]): Promise<Aggregate<TDocument[]>> {
    return this.model.aggregate(pipeline);
  }
}
