import { StaticImageData } from "next/image"

export type CandidateType = {
    CandidateName: string,
    ImageUrl: StaticImageData,
    theme: {
      color: string,
    }
    initialVotes : number,
    id : number,
  }