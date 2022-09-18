import { Schema, model, InferSchemaType, Types } from "mongoose";

const schema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
  },
  phone: {
    type: String,
    minlength: 5,
  },
  street: {
    type: String,
    required: true,
    minlength: 5,
  },
  city: {
    type: String,
    required: true,
    minlength: 5,
  },
});

export type PersonType = InferSchemaType<typeof schema> & {
  _id: Types.ObjectId;
};

const Person = model<PersonType>("Person", schema);

export default Person;
