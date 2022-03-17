import User from "../models/index.js";

export const removeBook = async (_, {bookId}, context) => {
	try {
		const newUser = await User.findOneAndUpdate(
			{_id: context.user.id},
			{
				$pull: {
					savedBooks: {bookId},
				},
			},
			{new: true}
		);

		return newUser;
	} catch (error) {
		console.log(`[ERROR]: Failed to remove book || ${error.message}`);
	}
};
