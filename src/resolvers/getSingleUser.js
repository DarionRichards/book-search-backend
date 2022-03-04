import {ApolloError} from "apollo-server-errors";
import User from "../models/index.js";

export const getSingleUser = async (_, {_id, username}) => {
	try {
		const userFromDb = await User.findOne({
			$or: [{_id: _id}, {username: username}],
		});

		if (userFromDb) {
			return userFromDb;
		}

		throw new ApolloError("Could not get user");
	} catch (error) {
		console.log(`[ERROR]: Failed to get user | ${error.message}`);
	}
};
