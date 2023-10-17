import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

type VoteMap = {
  [key: string]: number;
};
const sumVoteMaps = (
  base: VoteMap,
  newVotes: VoteMap,
  votesAmount: number
): VoteMap => {
  const result: VoteMap = { ...base };
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
export const updateGlobalStats = functions.firestore
  .document("/prodes/{slugProde}/votes/{voteUid}")
  .onCreate(async (snap) => {
    const newVoteData: VoteMap = snap.data().votes;
    const globalStatsRef = admin
      .firestore()
      .doc("/globalStats/presidential2023");

    const prodeDoc = await globalStatsRef.get();
    if (!prodeDoc.exists) {
      console.error("Documento Prode no encontrado");
      return;
    }
    const currentStats: VoteMap = prodeDoc.data()!.stats || {};
    const votesAmount = prodeDoc.data()!.votesAmount || 0;

    const updatedStats = sumVoteMaps(currentStats, newVoteData, votesAmount);

    return globalStatsRef.update({
      stats: updatedStats,
      votesAmount: votesAmount + 1,
    });
  });
