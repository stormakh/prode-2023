import { IVote } from "./vote"

interface IProde {
  name: string
  slug: string
  createdAt: string
  modifiedAt: string
  owner: string
  ownerName: string
  votes: IVote[]
  stats: {
    [key: string]: number
  }
}

type CreateProdeRequestDto = Pick<IProde, "name" | "slug" | "owner" | "ownerName">

type GetProdeResponseDto = Omit<IProde, "votes">
type GetFullProdeResponseDto = IProde

export type {
  CreateProdeRequestDto,
  GetProdeResponseDto,
  GetFullProdeResponseDto,
  IProde,
}
