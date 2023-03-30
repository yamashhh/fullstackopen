import mongoose, { InferSchemaType, Types } from 'mongoose';

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
  },
  favouriteGenre: {
    type: String,
    required: true,
  },
});

export type UserType = InferSchemaType<typeof schema> & {
  _id: Types.ObjectId;
};

const User = mongoose.model<UserType>('User', schema);

export default User;
