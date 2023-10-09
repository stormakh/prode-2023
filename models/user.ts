interface IUser {
	uid: string;
	level: Level;
	createdAt: string;
	modifiedAt: string;
}

interface IAnonymousUser extends IUser {
	username: string;
}

interface IAuthenticatedUser extends IUser {
	displayName: string;
	email: string;
	photoUrl: string;
}

type Level = "initial";

type CreateUserRequestDto = Omit<
	IAuthenticatedUser,
	"createdAt" | "modifiedAt"
>;
type CreateAnonUserRequestDto = Omit<
	IAnonymousUser,
	"createdAt" | "modifiedAt"
>;

type GetUserResponseDto = IAuthenticatedUser | IAnonymousUser;

export type {
	CreateUserRequestDto,
	CreateAnonUserRequestDto,
	GetUserResponseDto,
};
