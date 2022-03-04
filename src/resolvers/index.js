import {getSingleUser} from "./getSingleUser.js";
import {addUser} from "./addUser.js";
import {saveBook} from "./saveBook.js";
import {removeBook} from "./removeBook.js";

export const resolvers = {
	Query: {
		me: getSingleUser,
	},
	Mutation: {
		// 	login,
		addUser,
		saveBook,
		removeBook,
	},
};
