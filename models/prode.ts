import { IVote } from "./vote";

interface IProde {
	name: string;
	slug: string;
	createdAt: string;
	modifiedAt: string;
	owner: string;
	votes: IVote[];
}

type CreateProdeRequestDto = Pick<IProde, "name" | "slug" | "owner">;

type GetProdeResponseDto = Omit<IProde, "votes">;
type GetFullProdeResponseDto = IProde;

export type {
	CreateProdeRequestDto,
	GetProdeResponseDto,
	GetFullProdeResponseDto,
	IProde,
};
