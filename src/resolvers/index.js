import {getSingleUser} from "./getSingleUser.js";

export const resolvers = {
	Query: {
		me: getSingleUser,
	},
	// Mutation: {
	// 	login,
	// 	addUser,
	// 	saveBook,
	// 	removeBook,
	// },
};
