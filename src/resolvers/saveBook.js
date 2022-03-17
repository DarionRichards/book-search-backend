import {ApolloError} from "apollo-server-errors";
import User from "../models/index.js";

export const saveBook = async (_, {bookInput}, context) => {
	try {
		if (!context.user) {
			throw new ApolloError("Failed to save book, not authorized");
		}

		const updatedUser = await User.findOneAndUpdate(
			{_id: context.user.id},
			{$addToSet: {savedBooks: bookInput}},
			{new: true}
		);
		return updatedUser;
	} catch (error) {
		console.log(`[ERROR]: Failed to save book || ${error.message}`);
	}
};
