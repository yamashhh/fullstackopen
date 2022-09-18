import { InferSchemaType, model, Schema, Types } from "mongoose";

const schema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
  },
  friends: [
    {
      type: Types.ObjectId,
      ref: "Person",
    },
  ],
});

export type UserType = InferSchemaType<typeof schema> & { _id: Types.ObjectId };

const User = model<UserType>("User", schema);

export default User;
