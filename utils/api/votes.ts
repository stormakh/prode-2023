import { CreateVoteRequestDto, GetVoteResponseDto } from "@/models/vote"
import {
  DB_PRODES_COLLECTION_NAME,
  DB_USERS_COLLECTION_NAME,
  DB_USERS_PRODES_COLLECTION_NAME,
  DB_VOTES_COLLECTION_NAME,
} from "../db/constants"
import db from "../db"
import { collection, doc, getDoc, setDoc } from "@firebase/firestore"

export async function createVote(
  createVoteReq: CreateVoteRequestDto,
  prodeSlug: string
): Promise<void> {
  const voteModel = {
    ...createVoteReq,
    createdAt: new Date().toISOString(),
    modifiedAt: new Date().toISOString(),
  }

  const voterRef = doc(
    collection(db, DB_PRODES_COLLECTION_NAME),
    prodeSlug,
    DB_VOTES_COLLECTION_NAME,
    voteModel.voterUid
  )
  setDoc(voterRef, voteModel).then(() => {
    console.log("Vote created in prode collection")
  })
  // Duplicate prode participation in user collection
  const prodeRef = doc(
    collection(db, DB_USERS_COLLECTION_NAME),
    voteModel.voterUid,
    DB_USERS_PRODES_COLLECTION_NAME,
    prodeSlug
  )

  await setDoc(prodeRef, {
    name: prodeSlug,
    slug: prodeSlug,
    isOwner: false,
  }).then(() => {
    console.log("Vote created in users collection")
  })
}

export async function getVote(
  prodeSlug: string,
  voteId: string
): Promise<GetVoteResponseDto> {
  const voteRef = doc(
    collection(db, DB_PRODES_COLLECTION_NAME),
    prodeSlug,
    DB_VOTES_COLLECTION_NAME,
    voteId
  )
  const voteSnapshot = await getDoc(voteRef)
  const vote = await voteSnapshot.data()
  return vote as GetVoteResponseDto
}
