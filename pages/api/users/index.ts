import { CreateUserRequestDto, GetUserResponseDto } from "@/models/user";
import { createUser } from "@/utils/api/users";
import db from "@/utils/db";
import { DB_USERS_COLLECTION_NAME } from "@/utils/db/constants";
import { NextApiRequest, NextApiResponse } from "next";

export default async (
	req: NextApiRequest,
	res: NextApiResponse<GetUserResponseDto>
) => {
	console.log(req.method);
	switch (req.method) {
		case "POST":
			const createUserReq: CreateUserRequestDto = req.body;
			const user = await createUser(createUserReq);
			res.status(200).json(user);
		default:
			throw new Error("Method not supported");
	}
};
