import { CreateUserRequestDto, GetUserResponseDto } from "@/models/user";
import { DB_USERS_COLLECTION_NAME } from "../db/constants";
import db from "../db";
import { DocumentReference } from "firebase-admin/firestore";

export async function createUser(
	createUserReq: CreateUserRequestDto
): Promise<GetUserResponseDto> {
	const userModel = {
		...createUserReq,
		createdAt: new Date().toISOString(),
		modifiedAt: new Date().toISOString(),
	};

	const user = await db.collection(DB_USERS_COLLECTION_NAME).add(userModel);
	console.log(user);
	return user as unknown as GetUserResponseDto;
}
