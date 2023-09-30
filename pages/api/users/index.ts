import { CreateUserRequestDto, GetUserResponseDto } from "@/models/user";
import { createUser } from "@/utils/api/users";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse<void>) => {
	console.log(req.method);
	switch (req.method) {
		case "POST":
			const createUserReq: CreateUserRequestDto = req.body;
			await createUser(createUserReq);
			res.status(200).end();
			break;
		default:
			throw new Error("Method not supported");
	}
};
