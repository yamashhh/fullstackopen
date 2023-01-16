import { ApolloServer, UserInputError } from 'apollo-server';
import { readFileSync } from 'fs';
import type { FilterQuery } from 'mongoose';
import path from 'path';
import type { Resolvers } from './generated/graphql';
import Author, { AuthorType } from './models/author';
import Book, { BookType } from './models/book';
import './server';

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
  },
  Mutation: {
    async addBook(_, args) {
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
    async editAuthor(_, args) {
      const { name, setBornTo } = args;
      return Author.findOneAndUpdate(
        { name },
        { born: setBornTo },
        { new: true, runValidators: true }
      );
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
