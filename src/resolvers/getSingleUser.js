import {ApolloError} from "apollo-server-errors";
import User from "../models/index.js";

export const getSingleUser = async (_, __, context) => {
	try {
		const userFromDb = await User.findOne({
			$or: [{_id: context.user.id}, {username: context.user.username}],
		});

		if (!userFromDb) {
			throw new ApolloError("Could not get user");
		}

		return userFromDb;
	} catch (error) {
		console.log(`[ERROR]: Failed to get user | ${error.message}`);
	}
};
