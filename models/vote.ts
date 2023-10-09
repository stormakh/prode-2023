interface IVote {
	voterUid: string;
	createdAt: string;
	modifiedAt: string;
	voterDisplayName: string;
	votes: CandidateVotes;
}

type CreateVoteRequestDto = Omit<IVote, "createdAt" | "modifiedAt">;

type GetVoteResponseDto = IVote;

export type { CreateVoteRequestDto, GetVoteResponseDto, IVote };
