import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

const db = admin.firestore();

// type VoteMap = {
//   [key: string]: number;
// };

type globalStateSnapshotType = {
  votesAmount: number;
  prodeAmount: number;
  stats: {
    [key: string]: number;
  };
};

// Define the Cloud Function
export const aggregatePastVotes = functions.https.onRequest(
  async (req, res) => {
    try {
      const globalStateSnapshot: globalStateSnapshotType = {
        votesAmount: 0,
        prodeAmount: 0,
        stats: {},
      };
      // Fetch all documents from the /prodes collection
      const prodesSnapshot = await db.collection("prodes").get();

      const allStats = [];

      for (const prodeDoc of prodesSnapshot.docs) {
        // Fetch all votes documents in the subcollection
        const statsSnapshot = prodeDoc.data()!.stats;
        const voteAmountSnapshot = await prodeDoc.data()!.votesAmount;
        if (voteAmountSnapshot)
          globalStateSnapshot.votesAmount += voteAmountSnapshot;

        allStats.push(statsSnapshot);
      }
      allStats.map((stats) => {
        // Iterate over each vote in the prode
        let prodeIsValid = 0;
        if (!stats) return;
        for (const [key, value] of Object.entries(stats)) {
          // If the vote exists in the aggregated votes object, add 1 to the vote count
          prodeIsValid += value as number;
          if (globalStateSnapshot.stats[key]) {
            globalStateSnapshot.stats[key] += value as number;
          } else {
            // If the vote doesn't exist in the aggregated votes object, create it and set the vote count to 1
            globalStateSnapshot.stats[key] = value as number;
          }
        }
        if (prodeIsValid > 95 && prodeIsValid < 105)
          globalStateSnapshot.prodeAmount += 1;
      });
      Object.entries(globalStateSnapshot.stats).map(([key, value]) => {
        globalStateSnapshot.stats[key] =
          value / globalStateSnapshot.prodeAmount;
      });

      res.status(200).send(globalStateSnapshot);
    } catch (error) {
      console.error("Error aggregating votes: ", error);
      res.status(500).send("Internal Server Error.");
    }
  }
);
