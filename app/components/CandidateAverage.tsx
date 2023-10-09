import { CandidateType } from "@/models/candidate"
import Image from "next/image"
import { CandidateStatsType } from "../prode/[slug]/prode_stats"

export default function CandidateAverage({
  candidate,
}: {
  candidate: CandidateStatsType
}) {
  const votesToWidth =
    candidate.vote !== undefined
      ? candidate.vote.toString() + "%"
      : candidate.initialVotes.toString() + "%"

  return (
    <div className="flex flex-row gap-x-2">
      <div className="w-1/5 flex-none aspect-square">
        <Image
          src={candidate.imageUrl}
          alt={candidate.candidateName}
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </div>
      <div className="flex flex-grow flex-col justify-around ">
        <div
          className="flex flex-row justify-between border-b"
          style={{
            color: candidate.theme.color,
            borderColor: candidate.theme.color,
          }}
        >
          <h1 className="text-black font-semibold text-xl">
            {candidate.candidateName}
          </h1>
          <h1 className=" text-2xl">{candidate.vote?.toFixed(2)} %</h1>
        </div>
        <div className="mt-2 md:mt-1 lg:mt-0">
          <div className=" mb-5 h-3 rounded-full bg-gray-200">
            <div
              className="h-3 rounded-full "
              style={{
                width: votesToWidth,
                backgroundColor: candidate.theme.color,
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
}
