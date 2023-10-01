import { addDoc, collection, doc, getDoc, setDoc } from "@firebase/firestore";
import db from "../db";
import {
	DB_PRODES_COLLECTION_NAME,
	DB_USERS_COLLECTION_NAME,
	DB_USERS_PRODES_COLLECTION_NAME,
} from "../db/constants";
import { createUser } from "./users";
import { CreateUserRequestDto } from "@/models/user";
import { User } from "@firebase/auth";

export async function createProde(
	prode: CreateProdeRequestDto,
	firebaseUser: User
) {
	try {
		const prodeModel = {
			...prode,
			createdAt: new Date().toISOString(),
			modifiedAt: new Date().toISOString(),
		};
		console.log("Insert in prode collection");
		const prodeDoc = doc(
			collection(db, DB_PRODES_COLLECTION_NAME),
			prodeModel.slug
		);
		const userDoc = doc(
			collection(db, DB_USERS_COLLECTION_NAME),
			prodeModel.owner
		);
		const [prodeRes, userRes] = await Promise.all([
			setDoc(prodeDoc, prodeModel),
			getDoc(userDoc),
		]);
		console.log(userRes);
		if (!userRes.exists()) {
			const createUserDto: any = {
				displayName: firebaseUser.displayName,
				email: firebaseUser.email,
				photoUrl: firebaseUser.photoURL,
				uid: firebaseUser.uid,
			};
			const userCreated = await createUser(createUserDto);
			console.log(userCreated);
		}
		console.log("Insert in users collection");
		const prodeRef = doc(
			collection(db, DB_USERS_COLLECTION_NAME),
			prodeModel.owner,
			DB_USERS_PRODES_COLLECTION_NAME,
			prodeModel.slug
		);
		const prodeUserRes = await setDoc(prodeRef, {
			name: prodeModel.name,
			slug: prodeModel.slug,
			isOwner: true,
		});
		console.log(prodeUserRes);
	} catch (e) {
		console.error(e);
	}
}
