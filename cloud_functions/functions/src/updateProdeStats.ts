import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
// type VoteMap = {
//     Bregman: number
//     Bullrich: number
//     Massa: number
//     Milei: number
//     Schiaretti: number };

type VoteMap = {
  [key: string]: number
}
const sumVoteMaps = (
  base: VoteMap,
  newVotes: VoteMap,
  votesAmount: number
): VoteMap => {
  const result: VoteMap = {...base};
  for (const key in newVotes) {
    if (newVotes[key] !== undefined) {
      if (votesAmount === 0) {
        result[key] = result[key as keyof VoteMap] || 0;
      }
      result[key] =
        (result[key as keyof VoteMap] || 0) +
        (newVotes[key] - result[key as keyof VoteMap]) / (votesAmount + 1);
    }
  }
  return result;
};
export const incrementVoteStats = functions.firestore
  .document("/prodes/{slugProde}/votes/{voteUid}")
  .onCreate(async (snap, context) => {
    const newVoteData: VoteMap = snap.data().votes;
    const prodeRef = admin
      .firestore()
      .doc(`/prodes/${context.params.slugProde}`);

    const prodeDoc = await prodeRef.get();
    if (!prodeDoc.exists) {
      console.error("Documento Prode no encontrado");
      return;
    }
    const currentStats: VoteMap = prodeDoc.data()!.stats || {};
    const votesAmount = prodeDoc.data()!.votesAmount || 0;

    const updatedStats = sumVoteMaps(currentStats, newVoteData, votesAmount);

    return prodeRef.update({
      stats: updatedStats,
      votesAmount: votesAmount + 1,
    });
  });
