interface IProde {
	name: string;
	slug: string;
	createdAt: string;
	modifiedAt: string;
	owner: string;
}

type CreateProdeRequestDto = Pick<IProde, "name" | "slug" | "owner">;
