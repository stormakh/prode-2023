"use client"
import { useEffect, useMemo, useState } from "react"
import { CandidateList } from "@/utils/candidateInfo/candidateList"
import CandidateVoteBox from "../../components/CandidateVoteBox"
import Navbar from "../../components/Navbar"
import { useAuth } from "../../contexts/AuthContext"
import { createVote, getVote } from "@/utils/api/votes"
import ProdeStats from "./prode_stats"
import InputVote from "./input_vote"

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
  const [showProdeStats,setShowProdeStats] = useState<boolean>(false)
  const [vote, setVote] = useState<VoteType[]>(initialCandidateVote)
  const [errorMessage, setErrorMessage] = useState<string>("")
  const { firebaseUser } = useAuth()

  useEffect(() => {
    console.log("VOTING SLUG:", params.slug)
    console.log("VOTING USER:", firebaseUser && firebaseUser.uid)
    console.log("TODO ALERT: CHECK IF PRODE EXISTS & IF USER HAS VOTED")
    const getVoteAsync = async () => {
      if (!firebaseUser) return
      const vote = await getVote(params.slug, firebaseUser.uid)
      if(vote){
        setShowProdeStats(true)
      }
      console.log("INITIAL VOTE CHECK:", vote)
      
    }
    getVoteAsync()
  }, [firebaseUser])



  return (
    <main className="">
      <Navbar />
      {showProdeStats ? <ProdeStats/> : <InputVote params={{
        slug: params.slug
      }}/>}

      
    </main>
  )
}
