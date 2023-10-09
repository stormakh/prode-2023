"use client"
import { useEffect, useMemo, useState } from "react"
import { CandidateList } from "@/utils/candidateInfo/candidateList"
import CandidateVoteBox from "../../components/CandidateVoteBox"
import Navbar from "../../components/Navbar"
import { useAuth } from "../../contexts/AuthContext"
import { checkVoteExists, createVote, getVote } from "@/utils/api/votes"
import ProdeStats from "./prode_stats"
import InputVote from "./input_vote"
import { getProde } from "@/utils/api/prodes"
import { GetProdeResponseDto } from "@/models/prode"




type VoteType = {
  candidateId: number
  voteValue: number
}

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
]

initialCandidateVote.forEach((candidate, index) => {
  candidate.voteValue = CandidateList[index].initialVotes
})

export default function ProdeDetails({ params }: { params: { slug: string } }) {
  const [showProdeStats, setShowProdeStats] = useState<boolean>(false)
  const [prode, setProde] = useState<GetProdeResponseDto | undefined>(undefined)
  const { firebaseUser,isAuthenticated } = useAuth()

  useEffect(() => {
    console.log("VOTING SLUG:", params.slug)
    console.log("VOTING USER:", firebaseUser && firebaseUser.uid)
    console.log("TODO ALERT: CHECK IF PRODE EXISTS & IF USER HAS VOTED")
    const getVoteAsync = async () => {
      if (!firebaseUser) return
      const hasVoted = await checkVoteExists(params.slug, firebaseUser.uid).catch((err) => {
        console.log(err + 'checkVoteExists error')
      })
      const prodeRes = await getProde(params.slug);
      setProde(prodeRes)
      console.log("PRODE CHECK:", prodeRes)
      if (hasVoted == 'true') {
        console.log("HAS VOTED:", hasVoted)
        setShowProdeStats(true)
      }else {
        console.log("HAS VOTED:", hasVoted)
        setShowProdeStats(false)
      }

      console.log("INITIAL VOTE CHECK:", hasVoted)
    }
    getVoteAsync()
  }, [firebaseUser])
  
  return (
    <main className="">
      {showProdeStats ? (
        <ProdeStats params={{ prode, slug: params.slug }} />
      ) : (
        <InputVote
          params={{
            slug: params.slug,
            ownerName : prode?.ownerName,
            setShowProdeStats: setShowProdeStats,
          }}
        />
      )}
    </main>
  )
}
