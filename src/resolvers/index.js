import {getSingleUser} from "./getSingleUser.js";
import {addUser} from "./addUser.js";

export const resolvers = {
	Query: {
		me: getSingleUser,
	},
	Mutation: {
		// 	login,
		addUser,
		// 	saveBook,
		// 	removeBook,
	},
};
