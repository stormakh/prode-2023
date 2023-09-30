import { addDoc, collection, setDoc } from "@firebase/firestore";
import db from "../db";
import {
	DB_PRODES_COLLECTION_NAME,
	DB_USERS_COLLECTION_NAME,
	DB_USERS_PRODES_COLLECTION_NAME,
} from "../db/constants";

export async function createProde(prode: CreateProdeRequestDto) {
	const prodeModel = {
		...prode,
		createdAt: new Date().toISOString(),
		modifiedAt: new Date().toISOString(),
	};
	console.log("Insert in prode collection");
	const prodeRes = await addDoc(
		collection(db, DB_PRODES_COLLECTION_NAME),
		prodeModel
	);

	console.log("Insert in users collection");
	// const usersRes = setDoc(
	// 	DB_USERS_COLLECTION_NAME,
	// 	prodeModel.owner,
	// 	DB_USERS_PRODES_COLLECTION_NAME,
	// 	prodeRes.id
	// );
	// await db
	// 	.collection(DB_USERS_COLLECTION_NAME)
	// 	.doc(prodeModel.owner)
	// 	.collection(DB_USERS_PRODES_COLLECTION_NAME)
	// 	.doc(prodeRes.id)
	// 	.set({
	// 		name: prodeModel.name,
	// 		slug: prodeModel.slug,
	// 		isOwner: true,
	// 	});
	// console.log(usersRes);
}
