import {
  ApolloServer,
  AuthenticationError,
  UserInputError,
} from "apollo-server";
import { readFileSync } from "fs";
import path from "path";
import { Resolvers, YesNo } from "./generated/graphql";
import mongoose, { Error, Types } from "mongoose";
import Person, { PersonType } from "./models/person";
import jwt from "jsonwebtoken";
import User, { UserType } from "./models/user";

import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
const MONGODB_URI = process.env["MONGODB_URI"];
if (!MONGODB_URI) {
  throw new Error("Failed to read MONGODB_URI.");
}

(async (): Promise<void> => {
  try {
    console.log("connecting to", MONGODB_URI);
    await mongoose.connect(MONGODB_URI);
    console.log("connected to MongoDB");
  } catch (error) {
    console.error("failed to connect MongoDB");
    console.dir(error);
  }
})();

const typeDefs = readFileSync(
  path.resolve(__dirname, "schema.graphql"),
  "utf8"
);

const JWT_SECRET = process.env["JWT_SECRET"];

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
        throw new AuthenticationError("not authenticated");
      }

      try {
        const result = await person.save();
        currentUser.friends = currentUser.friends.concat(result);
        await currentUser.save();
        return result;
      } catch (error) {
        throw new UserInputError((error as Error).message, {
          invalidArgs: args,
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
        throw new UserInputError((error as Error).message, {
          invalidArgs: args,
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
        throw new UserInputError((error as Error).message, {
          invalidArgs: args,
        });
      }
    },
    async login(_, args) {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new UserInputError("wrong credentials");
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, JWT_SECRET ?? "") };
    },
    // @ts-ignore
    async addAsFriend(
      _,
      args,
      { currentUser }: { currentUser: UserType | undefined }
    ) {
      const isFriend = (person: PersonType | null) =>
        !!currentUser?.friends
          .map((friend: any) => friend?._id?.toString() ?? "")
          .includes(person?._id.toString() ?? "");

      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }

      const person = await Person.findOne({ name: args.name });
      if (!isFriend(person)) {
        // @ts-ignore
        currentUser.friends = currentUser.friends.concat(person);
      }

      // @ts-ignore
      await currentUser.save();

      return currentUser;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  async context({ req }) {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith("bearer ") && JWT_SECRET) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET) as
        | { username: string; id: Types.ObjectId }
        | undefined;
      const currentUser = await User.findById(decodedToken?.id).populate(
        "friends"
      );
      return { currentUser };
    }
    return undefined;
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
