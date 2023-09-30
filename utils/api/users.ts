import { CreateUserRequestDto, GetUserResponseDto } from "@/models/user";
import { DB_USERS_COLLECTION_NAME } from "../db/constants";
import db from "../db";
import { DocumentReference } from "firebase-admin/firestore";

export async function createUser(
	createUserReq: CreateUserRequestDto
): Promise<void> {
	const userModel = {
		...createUserReq,
		createdAt: new Date().toISOString(),
		modifiedAt: new Date().toISOString(),
	};

	await db
		.collection(DB_USERS_COLLECTION_NAME)
		.doc(userModel.uid)
		.set(userModel);
}
