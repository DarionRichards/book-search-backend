import {ApolloServer, gql} from "apollo-server-express";
import {ApolloServerPluginDrainHttpServer} from "apollo-server-core";
import express from "express";
import http from "http";
import mongoose from "mongoose";

const app = express();
const httpServer = http.createServer(app);

const helloWorld = () => {
	return "Hello, World!!";
};

const typeDefs = gql`
	type Query {
		hello: String
	}
`;

const resolvers = {
	Query: {
		hello: helloWorld,
	},
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
	plugins: [ApolloServerPluginDrainHttpServer({httpServer})],
});

const init = async () => {
	try {
		await mongoose.connect("mongodb://localhost:27017/bookSearchDb", {
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
