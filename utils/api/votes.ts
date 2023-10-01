import { CreateVoteRequestDto, GetVoteResponseDto } from "@/models/vote";
import { DB_VOTES_COLLECTION_NAME } from "../db/constants";
import db from "../db";
import { collection, doc, setDoc } from "@firebase/firestore";

export async function createVote(
	createVoteReq: CreateVoteRequestDto
): Promise<void> {
	const voteModel = {
		...createVoteReq,
		createdAt: new Date().toISOString(),
		modifiedAt: new Date().toISOString(),
	};

	const voterRef = doc(
		collection(db, DB_VOTES_COLLECTION_NAME),
		voteModel.voterUid
	);
	await setDoc(voterRef, voteModel);
}
