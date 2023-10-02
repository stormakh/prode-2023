"use client";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { createUser } from "@/utils/api/users";
import { CreateUserRequestDto } from "@/models/user";
import { useEffect, useState } from "react";
import { GetProdeResponseDto } from "@/models/prode";
import { getProde } from "@/utils/api/prodes";

const UserPage = () => {
	const [prode, setProde] = useState<GetProdeResponseDto | null>(null);
	const { firebaseUser } = useAuth();
	console.log(firebaseUser);
	useEffect(() => {
		const getMyProde = async () => {
			const res = await getProde("cami-capa");
			setProde(res);
		};
		getMyProde();
	}, []);
	return <main>{JSON.stringify(prode)}</main>;
};

export default UserPage;
