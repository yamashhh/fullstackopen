import mongoose, { InferSchemaType, Types } from 'mongoose';

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: 2,
  },
  published: {
    type: Number,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
  },
  genres: [{ type: String }],
});

export type BookType = InferSchemaType<typeof schema> & {
  _id: Types.ObjectId;
};

const Book = mongoose.model<BookType>('Book', schema);

export default Book;
