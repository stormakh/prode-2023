interface IVote {
	voterUid: string;
	createdAt: string;
	modifiedAt: string;
	votes: CandidateVotes;
}

type CreateVoteRequestDto = Omit<IVote, "createdAt" | "modifiedAt">;

type GetVoteResponseDto = IVote;

export type { CreateVoteRequestDto, GetVoteResponseDto, IVote };
