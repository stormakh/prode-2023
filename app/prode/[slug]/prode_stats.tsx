import { useEffect, useState } from "react"
import { CandidateList } from "@/utils/candidateInfo/candidateList"
import { CandidateType } from "@/models/candidate"
import Navbar from "../../components/Navbar"
import CandidateAverage from "../../components/CandidateAverage"
import TablaVotantes from "../../components/TablaVotantes"
import { GetFullProdeResponseDto, GetProdeResponseDto } from "@/models/prode"
import { getFullProde } from "@/utils/api/prodes"

export type CandidateStatsType = CandidateType & { vote?: number }
export default function ProdeStats({
  params,
}: {
  params: { prode?: GetProdeResponseDto; slug: string }
}) {
  const [candidateStats, setCandidateStats] =
    useState<CandidateStatsType[]>(CandidateList)
  const [fullProde, setFullProde] = useState<
    GetFullProdeResponseDto | undefined
  >(undefined)
  useEffect(() => {
    const localCandidateStats: CandidateStatsType[] = []
    CandidateList.forEach((candidate) => {
      const vote = params.prode?.stats[candidate.candidateIdentifier]
      const candidateWithVote = { ...candidate, vote: vote }
      localCandidateStats.push(candidateWithVote)
    })
    setCandidateStats(localCandidateStats)
    const getFullProdeAsync = async () => {
      const fullProdeLocal = await getFullProde(params.slug)
      console.log("FULL PRODE:", fullProdeLocal)
      setFullProde(fullProdeLocal)
    }
    getFullProdeAsync()
  }, [params.prode, params.slug])
  return (
    <>
      <Navbar />
      <div className="p-4">
        <div className=" border-b-1/2 border-teal-500">
          <h1 className="text-teal-500 text-3xl font-bold">Promedio</h1>
        </div>
        <div className="flex flex-col mt-4 gap-y-4 justify-between">
          {candidateStats.map((candidate, index) => {
            return <CandidateAverage candidate={candidate} key={index} />
          })}
        </div>
      </div>
      <div className="flex flex-col justify-center w-full p-4 gap-y-20">
        <TablaVotantes votesList={fullProde?.votes || []} />
        <button className="bg-teal-500 text-white font-bold p-2 rounded-md text-2xl">
          Crea el tuyo
        </button>
      </div>
    </>
  )
}
