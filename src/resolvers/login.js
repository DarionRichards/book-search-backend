import {AuthenticationError} from "apollo-server-errors";
import User from "../models/index.js";
import {signToken} from "../utils/auth.js";

export const login = async (_, {loginInput}) => {
	try {
		const userFromDb = await User.findOne({email: loginInput.email});

		if (!userFromDb) {
			console.log("[ERROR]: Failed to login || Cannot find user");
			throw new AuthenticationError("Failed to login");
		}

		const correctPw = await userFromDb.isCorrectPassword(loginInput.password);

		if (!correctPw) {
			console.log("[ERROR]: Failed to login || Incorrect password");
			throw new AuthenticationError("Failed to login");
		}

		return {
			token: signToken(userFromDb),
			user: userFromDb,
		};
	} catch (error) {
		console.log(`[ERROR]: Failed to login || ${error.message}`);
	}
};
