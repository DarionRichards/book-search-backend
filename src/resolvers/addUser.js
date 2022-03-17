import {ApolloError} from "apollo-server-errors";
import User from "../models/index.js";
import {signToken} from "../utils/auth.js";

export const addUser = async (_, {userInput}) => {
	try {
		const newUser = await User.create(userInput);

		if (!newUser) {
			throw new ApolloError("Failed to create account");
		}

		return {
			token: signToken(newUser),
			user: newUser,
		};
	} catch (error) {
		console.log(`[ERROR]: Failed to create User || ${error.message}`);
	}
};
