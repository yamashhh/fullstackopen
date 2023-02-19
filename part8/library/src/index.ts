import {
  ApolloServer,
  AuthenticationError,
  UserInputError,
} from 'apollo-server';
import { readFileSync } from 'fs';
import type { FilterQuery, Types } from 'mongoose';
import path from 'path';
import jwt from 'jsonwebtoken';
import type { Resolvers } from './generated/graphql';
import Author, { AuthorType } from './models/author';
import Book, { BookType } from './models/book';
import User from './models/user';
import './server';
const JWT_SECRET = process.env['JWT_SECRET'];
const HARDCODED_PASSWORD = process.env['HARDCODED_PASSWORD'];
if (!JWT_SECRET || !HARDCODED_PASSWORD) {
  throw new ReferenceError('environment variable not found');
}

const typeDefs = readFileSync(
  path.resolve(__dirname, 'schema.graphql'),
  'utf8'
);

const resolvers: Resolvers = {
  Author: {
    async bookCount(root: AuthorType) {
      return Book.countDocuments({ author: root });
    },
  },
  Query: {
    async bookCount() {
      return Book.countDocuments();
    },
    async authorCount() {
      return Author.countDocuments();
    },
    async allBooks(_, args) {
      const { author: name, genre } = args;
      const author = await Author.findOne({ name }).exec();

      const filter: FilterQuery<BookType> = {};
      if (author) {
        filter.author = author;
      }
      if (genre) {
        filter.genres = { $in: [genre] };
      }

      return Book.find(filter).populate('author');
    },
    async allAuthors() {
      return Author.find({});
    },
    async allGenres() {
      const allBooks = await Book.find();
      return Array.from(new Set(allBooks.flatMap((book) => book.genres)));
    },
    me(_, __, context) {
      return context.currentUser;
    },
  },
  Mutation: {
    async addBook(_, args, context) {
      if (!context.currentUser) {
        throw new AuthenticationError('not authenticated');
      }
      const { title, published, author: authorName, genres } = args;
      let author = await Author.findOne({ name: authorName }).exec();
      try {
        author ??= await new Author({ name: authorName }).save();
        const newBook = await new Book({
          title,
          published,
          genres,
          author,
        }).save();
        return newBook;
      } catch (error) {
        if (error instanceof Error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          });
        }
        throw error;
      }
    },
    async editAuthor(_, args, context) {
      if (!context.currentUser) {
        throw new AuthenticationError('not authenticated');
      }
      const { name, setBornTo } = args;
      return Author.findOneAndUpdate(
        { name },
        { born: setBornTo },
        { new: true, runValidators: true }
      );
    },
    async createUser(_, args) {
      const { username, favouriteGenre } = args;
      try {
        const newUser = await new User({
          username,
          favouriteGenre,
        }).save();
        return newUser;
      } catch (error) {
        if (error instanceof Error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          });
        }
        throw error;
      }
    },
    async login(_, args) {
      const { username, password } = args;
      const user = await User.findOne({ username });
      if (!user || password !== HARDCODED_PASSWORD) {
        throw new UserInputError('wrong credentials');
      }
      return {
        value: jwt.sign({ username: user.username, id: user._id }, JWT_SECRET),
      };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  async context({ req }) {
    const searchString = 'bearer ';
    const auth = req.headers.authorization ?? null;
    if (!auth?.toLowerCase().startsWith(searchString)) {
      return;
    }
    const decodedToken = <{ username: string; id: Types.ObjectId }>(
      jwt.verify(auth.substring(searchString.length), JWT_SECRET)
    );
    const currentUser = await User.findById(decodedToken.id);
    return { currentUser };
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
