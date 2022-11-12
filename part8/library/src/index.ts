import {
  // UserInputError,
  ApolloServer,
} from 'apollo-server';
import { readFileSync } from 'fs';
import path from 'path';
import type { Resolvers } from './generated/graphql';
import Author from './models/author';
import Book from './models/book';
import './server';

const typeDefs = readFileSync(
  path.resolve(__dirname, 'schema.graphql'),
  'utf8'
);

const resolvers: Resolvers = {
  Query: {
    bookCount() {
      return Book.collection.countDocuments();
    },
    authorCount() {
      return Author.collection.countDocuments();
    },
    async allBooks(_, args) {
      const { author: name, genre } = args;
      console.log(name, genre);

      if (!name && !genre) {
        return Book.find({});
      }

      const author = await Author.findOne({ name }).exec();
      console.log('author', author);

      if (name && !author) {
        return null;
      }

      if (author && genre) {
        return Book.find({
          author,
          genres: { $in: [genre] },
        });
      }

      if (author) {
        return Book.find({ author });
      }

      if (genre) {
        console.log('bobobo');
        const book = await Book.find({ genres: { $in: [genre] } }).exec();
        console.log(book);

        return book;
      }

      // NOTE:
      // 何にも引っかからない場合
      return null;
    },
    async allAuthors() {
      // HACK:
      // return await しないとクエリ実行時にエラー...
      return await Author.find({});
    },
  },
  Mutation: {
    async addBook(_, args) {
      const { title, published, author: authorName, genres } = args;
      const author =
        (await Author.findOne({ author: authorName }).clone()) ??
        new Author({ name: authorName });
      const book = new Book({ title, published, genres, author });
      await author.save();
      return book.save();
    },
    // TODO:
    // editAuthor(_, args) {
    //   const { name, setBornTo } = args;
    //   const index = authors.findIndex((author) => author.name === name);
    //   if (index === -1) {
    //     throw new UserInputError('Author not found', {
    //       invalidArgs: name,
    //     });
    //   }

    //   authors[index]!.born = setBornTo;
    //   return authors[index];
    // },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
