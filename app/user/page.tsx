"use client";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { createUser } from "@/utils/api/users";
import { CreateUserRequestDto } from "@/models/user";

const UserPage = () => {
	const { firebaseUser } = useAuth();
	const handleClick = async () => {
		const user: any = {
			username: "John",
			level: "initial",
			uid: firebaseUser.uid,
		};

		const apiRes = await createUser(user);

		return apiRes;
	};
	return (
		<main>
			<button onClick={handleClick}>Create user</button>
		</main>
	);
};

export default UserPage;
