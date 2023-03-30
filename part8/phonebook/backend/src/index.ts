import { ApolloServer } from "@apollo/server";
import { readFileSync } from "fs";
import path from "path";
import mongoose, { Error, Types } from "mongoose";
import jwt from "jsonwebtoken";
import User from "./models/user";
import resolvers from "./resolvers";
import express from "express";
import http from "http";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import cors from "cors";
import { expressMiddleware } from "@apollo/server/express4";
import { WebSocketServer } from "ws";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { useServer } from "graphql-ws/lib/use/ws";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
const MONGODB_URI = process.env["MONGODB_URI"];
if (!MONGODB_URI) {
  throw new Error("Failed to read MONGODB_URI.");
}
export const JWT_SECRET = process.env["JWT_SECRET"];

(async () => {
  try {
    console.log("connecting to", MONGODB_URI);
    await mongoose.connect(MONGODB_URI);
    mongoose.set("debug", true);
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

const app = express();
const httpServer = http.createServer(app);
const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/",
});
const schema = makeExecutableSchema({ typeDefs, resolvers });
const serverCleanup = useServer({ schema }, wsServer);
const server = new ApolloServer({
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
  await server.start();
  app.use(
    "/",
    cors(),
    express.json(),
    expressMiddleware(server, {
      // @ts-ignore
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
    })
  );
  const PORT = 4000;
  httpServer.listen(PORT, () => {
    console.log(`Server is now running on http://localhost:${PORT}`);
  });
})();
