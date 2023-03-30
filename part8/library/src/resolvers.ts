import type { FilterQuery } from 'mongoose';
import { JWT_SECRET } from '.';
import type { Resolvers } from './generated/graphql';
import Author from './models/author'; // { AuthorType }
import Book, { type BookType } from './models/book';
import User from './models/user';
import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';
import { ApolloServerErrorCode } from '@apollo/server/errors';
import { PubSub } from 'graphql-subscriptions';
const pubsub = new PubSub();

const HARDCODED_PASSWORD = process.env['HARDCODED_PASSWORD'];
const TRIGGER_NAME = 'BOOK_ADDED';

export const resolvers: Resolvers = {
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

      return Book.find(filter).populate({
        path: 'author',
        populate: { path: 'bookCount' },
      });
    },
    async allAuthors() {
      return Author.find({}).populate('bookCount');
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
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: ApolloServerErrorCode.BAD_USER_INPUT,
            invalidArgs: args,
          },
        });
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
        pubsub.publish(TRIGGER_NAME, { bookAdded: newBook });
        return newBook;
      } catch (error) {
        if (error instanceof Error) {
          throw new GraphQLError(error.message, {
            extensions: {
              code: ApolloServerErrorCode.BAD_USER_INPUT,
              invalidArgs: args,
            },
          });
        }
        throw error;
      }
    },
    async editAuthor(_, args, context) {
      if (!context.currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: ApolloServerErrorCode.BAD_USER_INPUT,
            invalidArgs: args,
          },
        });
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
          throw new GraphQLError(error.message, {
            extensions: {
              code: ApolloServerErrorCode.BAD_USER_INPUT,
              invalidArgs: args,
            },
          });
        }
        throw error;
      }
    },
    async login(_, args) {
      const { username, password } = args;
      const user = await User.findOne({ username });
      if (!user || password !== HARDCODED_PASSWORD) {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: ApolloServerErrorCode.BAD_USER_INPUT,
          },
        });
      }
      if (!JWT_SECRET) {
        throw new Error('environment variable not found');
      }
      return {
        value: jwt.sign({ username: user.username, id: user._id }, JWT_SECRET),
      };
    },
  },
  Subscription: {
    bookAdded: {
      // @ts-ignore
      subscribe: () => pubsub.asyncIterator(TRIGGER_NAME),
    },
  },
};
