// import {AuthenticationError} from "apollo-server-errors";
import jsonwebtoken from "jsonwebtoken";

const {sign, verify} = jsonwebtoken;

const secret = process.env.SECRET;
const expiration = "2h";

export const signToken = ({email, username, id}) => {
	const payload = {email, username, id};
	return sign({data: payload}, secret, {expiresIn: expiration});
};

// export const authMiddleware = ({req}) => {
// 	let token = req.body.token || req.query.token || req.headers.authorization;

// 	if (req.headers.authorization) {
// 		token = token.split(" ").pop().trim();
// 	}

// 	if (!token) {
// 		return req;
// 	}

// 	try {
// 		const {data} = verify(token, secret, {maxAge: expiration});
// 		req.user = data;
// 	} catch {
// 		throw new AuthenticationError("Invalid token");
// 	}

// 	return req;
// };
