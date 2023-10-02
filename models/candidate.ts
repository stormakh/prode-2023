import { StaticImageData } from "next/image"

export type CandidateType = {
  candidateName: string
  candidateIdentifier: string
  imageUrl: StaticImageData
  theme: {
    color: string
  }
  initialVotes: number
  id: number
}
