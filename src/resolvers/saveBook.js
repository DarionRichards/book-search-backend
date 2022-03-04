import User from "../models/index.js";

export const saveBook = async (_, {userId, bookInput}) => {
	try {
		const updatedUser = await User.findOneAndUpdate(
			{_id: userId},
			{$addToSet: {savedBooks: bookInput}},
			{new: true}
		);
		return updatedUser;
	} catch (error) {
		console.log(`[ERROR]: Failed to save book || ${error.message}`);
	}
};
