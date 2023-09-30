import { CreateUserRequestDto, GetUserResponseDto } from "@/models/user";
import { DB_USERS_COLLECTION_NAME } from "../db/constants";
import db from "../db";
import { collection, doc, setDoc } from "@firebase/firestore";

export async function createUser(
	createUserReq: CreateUserRequestDto
): Promise<void> {
	const userModel = {
		...createUserReq,
		createdAt: new Date().toISOString(),
		modifiedAt: new Date().toISOString(),
	};
	console.log("Insert in users collection");
	const userRef = doc(
		collection(db, DB_USERS_COLLECTION_NAME),
		userModel.uid
	);
	const usersRes = await setDoc(userRef, userModel);
	console.log(usersRes);
}
