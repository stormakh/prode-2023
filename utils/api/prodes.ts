import {
	addDoc,
	collection,
	doc,
	getDoc,
	getDocs,
	setDoc,
} from "@firebase/firestore";
import db from "../db";
import {
	DB_PRODES_COLLECTION_NAME,
	DB_USERS_COLLECTION_NAME,
	DB_USERS_PRODES_COLLECTION_NAME,
	DB_VOTES_COLLECTION_NAME,
} from "../db/constants";
import { createUser } from "./users";
import { CreateUserRequestDto } from "@/models/user";
import { User } from "@firebase/auth";
import {
	CreateProdeRequestDto,
	GetFullProdeResponseDto,
	GetProdeResponseDto,
} from "@/models/prode";

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
		// Check if prode exists
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
		throw e;
	}
}

export async function getProde(slug: string): Promise<GetProdeResponseDto> {
	try {
		const prodeDoc = doc(collection(db, DB_PRODES_COLLECTION_NAME), slug);
		const prodeRes = await getDoc(prodeDoc);
		if (!prodeRes.exists()) {
			throw new Error("Prode not found");
		}
		const prode = prodeRes.data() as GetProdeResponseDto;
		return prode;
	} catch (e) {
		console.error(e);
		throw e;
	}
}

export async function getFullProde(
	slug: string
): Promise<GetFullProdeResponseDto> {
	try {
		const smallProde: GetProdeResponseDto = await getProde(slug);
		const prodeVotesCollection = collection(
			db,
			DB_PRODES_COLLECTION_NAME,
			slug,
			DB_VOTES_COLLECTION_NAME
		);
		const votes = await getDocs(prodeVotesCollection);
		const prodeVotes = votes.docs.map((vote) => vote.data());
		const fullProde = {
			...smallProde,
			votes: prodeVotes,
		};
		return fullProde as GetFullProdeResponseDto;
	} catch (e) {
		console.error(e);
		throw e;
	}
}
