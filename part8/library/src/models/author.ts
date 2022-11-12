import mongoose, { InferSchemaType, Types } from 'mongoose';

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 4,
  },
  born: {
    type: Number,
  },
});

export type AuthorType = InferSchemaType<typeof schema> & {
  _id: Types.ObjectId;
};

const Author = mongoose.model<AuthorType>('Author', schema);

export default Author;
