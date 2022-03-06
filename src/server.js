import "dotenv/config";
import {ApolloServer} from "apollo-server-express";
import {ApolloServerPluginDrainHttpServer} from "apollo-server-core";
import express from "express";
import http from "http";
import mongoose from "mongoose";

import {typeDefs} from "./schema/index.js";
import {resolvers} from "./resolvers/index.js";
import {authMiddleware} from "./utils/auth.js";

const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: authMiddleware,
	plugins: [ApolloServerPluginDrainHttpServer({httpServer})],
});

const init = async () => {
	try {
		await mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME}`, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		await server.start();

		server.applyMiddleware({app});

		await new Promise((resolve) => httpServer.listen({port: 4000}, resolve));

		console.log(
			`🚀 Server ready at http://localhost:4000${server.graphqlPath}`
		);
	} catch (error) {
		console.log(`[ERROR]: Failed to connect || ${error.message}`);
	}
};

init();
