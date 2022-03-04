import {gql} from "apollo-server-express";

export const typeDefs = gql`
	type User {
		_id: ID!
		username: String!
		email: String!
		bookCount: Int
		savedBooks: [Book]
	}

	type Book {
		bookId: ID
		authors: [String]
		description: String
		title: String
		image: String
		link: String
	}

	type Auth {
		token: ID!
		user: User
	}

	type Query {
		me(_id: String, username: String): User
	}

	input LoginInput {
		email: String!
		password: String!
	}

	input UserInput {
		username: String!
		email: String!
		password: String!
	}

	input BookInput {
		bookId: ID!
		authors: [String]
		description: String
		title: String
		image: String
		link: String
	}

	type Mutation {
		login(loginInput: LoginInput!): Auth
		addUser(userInput: UserInput!): Auth
		saveBook(userId: String!, bookInput: BookInput!): User
		removeBook(userId: String!, bookId: ID!): User
	}
`;
