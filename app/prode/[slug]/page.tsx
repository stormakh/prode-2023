"use client";
import { useEffect, useMemo, useState } from "react";
import { CandidateList } from "@/utils/candidateInfo/candidateList";
import { useAuth } from "../../contexts/AuthContext";
import { checkVoteExists, createVote, getVote } from "@/utils/api/votes";
import ProdeStats from "./prode_stats";
import InputVote from "./input_vote";
import { getProde } from "@/utils/api/prodes";
import { GetProdeResponseDto } from "@/models/prode";
import ProdeNotFoundErrorPage from "./error_page";
import { TbFidgetSpinner } from "react-icons/tb";

type VoteType = {
  candidateId: number;
  voteValue: number;
};

const initialCandidateVote: VoteType[] = [
  {
    candidateId: 1,
    voteValue: 0.0,
  },
  {
    candidateId: 2,
    voteValue: 0.0,
  },
  {
    candidateId: 3,
    voteValue: 0.0,
  },
  {
    candidateId: 4,
    voteValue: 0.0,
  },
  {
    candidateId: 5,
    voteValue: 0.0,
  },
];

initialCandidateVote.forEach((candidate, index) => {
  candidate.voteValue = CandidateList[index].initialVotes;
});

export default function ProdeDetails({ params }: { params: { slug: string } }) {
  const [showProdeStats, setShowProdeStats] = useState<boolean>(false);
  const [prode, setProde] = useState<GetProdeResponseDto | undefined>(
    undefined
  );
  const { firebaseUser } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getProde(params.slug)
      .then((res) => {
        setProde(res);
        console.log("PRODE CHECK:", res);
      })
      .catch((err) => {
        console.log("getProde error: ", err);
        return undefined;
      });
  }, [showProdeStats]);

  useEffect(() => {
    console.log("VOTING SLUG:", params.slug);
    console.log("VOTING USER:", firebaseUser && firebaseUser.uid);
    console.log("TODO ALERT: CHECK IF PRODE EXISTS & IF USER HAS VOTED");
    const getVoteAsync = async () => {
      if (!firebaseUser) return;
      const hasVoted = await checkVoteExists(
        params.slug,
        firebaseUser.uid
      ).catch((err) => {
        console.log("checkVoteExists error: ", err);
      });
      setIsLoading(false);
      if (hasVoted.exists == true) {
        setShowProdeStats(true);
      } else {
        if (showProdeStats !== false) {
          console.log("HasVoted == false: ", showProdeStats);
          setShowProdeStats(false);
        }
      }
    };
    getVoteAsync();
  }, [firebaseUser]);

  return (
    <main className="">
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <TbFidgetSpinner className=" spin w-1/4 h-1/4" />
        </div>
      ) : prode === undefined && isLoading === false ? (
        <ProdeNotFoundErrorPage />
      ) : showProdeStats ? (
        <ProdeStats
          params={{ prode, slug: params.slug, firebaseUser: firebaseUser }}
        />
      ) : (
        <InputVote
          params={{
            slug: params.slug,
            ownerName: prode?.ownerName,
            ownerId: prode?.owner,
            setShowProdeStats: setShowProdeStats,
          }}
        />
      )}
    </main>
  );
}
