import { ApolloServer } from '@apollo/server';
import { readFileSync } from 'fs';
import type { Types } from 'mongoose';
import path from 'path';
import jwt from 'jsonwebtoken';
import User from './models/user';
import './server';
import { resolvers } from './resolvers';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { expressMiddleware } from '@apollo/server/express4';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';

const PORT = 4000;

export const JWT_SECRET = process.env['JWT_SECRET'];
if (!JWT_SECRET) {
  throw new Error('environment variable not found');
}

const typeDefs = readFileSync(
  path.resolve(__dirname, 'schema.graphql'),
  'utf8'
);

const expressApp = express();
const httpServer = http.createServer(expressApp);
const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/',
});
const schema = makeExecutableSchema({ typeDefs, resolvers });
const serverCleanup = useServer({ schema }, wsServer);
const apolloServer = new ApolloServer({
  schema,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});

(async () => {
  await apolloServer.start();
  expressApp.use(
    '/',
    cors(),
    express.json(),
    expressMiddleware(apolloServer, {
      async context({ req }) {
        const searchString = 'bearer ';
        const auth = req.headers.authorization ?? null;
        if (!auth?.toLowerCase().startsWith(searchString)) {
          return {};
        }
        const decodedToken = <{ username: string; id: Types.ObjectId }>(
          jwt.verify(auth.substring(searchString.length), JWT_SECRET)
        );
        const currentUser = await User.findById(decodedToken.id);
        return { currentUser };
      },
    })
  );
  httpServer.listen(PORT, () =>
    console.log(`Server is now running on http://localhost:${PORT}`)
  );
})();
