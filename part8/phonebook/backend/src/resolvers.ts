import { GraphQLError } from "graphql";
import { ApolloServerErrorCode } from "@apollo/server/errors";
import { type Resolvers, YesNo } from "./generated/graphql";
import Person, { type PersonType } from "./models/person";
import User from "./models/user";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from ".";
import { PubSub } from "graphql-subscriptions";
const pubsub = new PubSub();
const PERSON_ADDED_LABEL = "PERSON_ADDED";

const resolvers: Resolvers = {
  Query: {
    async personCount() {
      return Person.collection.countDocuments();
    },
    async allPersons(_, args) {
      if (!args.phone) {
        return Person.find({});
      }
      return Person.find({ phone: { $exists: args.phone === YesNo.Yes } });
    },
    async findPerson(_, args) {
      return Person.findOne({ name: args.name });
    },
    me(_, __, context) {
      return context.currentUser;
    },
  },
  Person: {
    address: (root) => {
      return {
        street: root.street,
        city: root.city,
      };
    },
  },
  Mutation: {
    async addPerson(_, args, context) {
      const person = new Person({ ...args });
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: { code: "UNAUTHENTICATED" },
        });
      }

      try {
        const result = await person.save();
        currentUser.friends = currentUser.friends.concat(result);
        await currentUser.save();

        pubsub.publish(PERSON_ADDED_LABEL, { personAdded: result });
        return result;
      } catch (error) {
        throw new GraphQLError((error as Error).message, {
          extensions: {
            code: ApolloServerErrorCode.BAD_USER_INPUT,
            invalidArgs: args,
          },
        });
      }
    },
    async editNumber(_, args) {
      const person = await Person.findOne({ name: args.name });

      if (!person) {
        return null;
      }

      person.phone = args.phone;

      try {
        const result = await person.save();
        return result;
      } catch (error) {
        throw new GraphQLError((error as Error).message, {
          extensions: {
            code: ApolloServerErrorCode.BAD_USER_INPUT,
            invalidArgs: args,
          },
        });
      }
    },
    // @ts-ignore
    async createUser(_, args) {
      const user = new User({ username: args.username });

      try {
        const result = await user.save();
        return result;
      } catch (error) {
        throw new GraphQLError((error as Error).message, {
          extensions: {
            code: ApolloServerErrorCode.BAD_USER_INPUT,
            invalidArgs: args,
          },
        });
      }
    },
    async login(_, args) {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new GraphQLError("wrong credentials", {
          extensions: {
            code: ApolloServerErrorCode.BAD_USER_INPUT,
          },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, JWT_SECRET ?? "") };
    },
    async addAsFriend(_, args, context) {
      if (!context.currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: { code: "UNAUTHENTICATED" },
        });
      }

      const isFriend = (person: PersonType | null): boolean =>
        !!context.currentUser?.friends
          ?.map((friend: any) => friend?._id?.toString() ?? "")
          .includes(person?._id.toString() ?? "");

      const person = await Person.findOne({ name: args.name });
      if (person && context.currentUser?.friends && !isFriend(person)) {
        context.currentUser.friends =
          context.currentUser?.friends?.concat(person);
      }

      await context.currentUser.save();
      return context.currentUser;
    },
  },
  Subscription: {
    personAdded: {
      subscribe() {
        return pubsub.asyncIterator(PERSON_ADDED_LABEL);
      },
    },
  },
};

export default resolvers;
