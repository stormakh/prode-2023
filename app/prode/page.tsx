"use client";
import { useRouter } from "next/navigation";
import NavbarVacia from "../components/NavbarVacia";
import { useAuth } from "../contexts/AuthContext";
import { z } from "zod";
import { useEffect, useState } from "react";
import { createProde } from "@/utils/api/prodes";
import { CreateProdeRequestDto } from "@/models/prode";

type ProdeName = z.infer<typeof prodeNameSchema>;

const prodeNameSchema = z
	.string()
	.nonempty( { message: "El nombre no puede estar vacio" })
	.refine(
		(value) => {
			return (
				!value.includes(".") &&
				!value.includes("?") &&
				value.length <= 50
			);
		},
		{
			message: "El nombre no puede contener puntos ni signos de pregunta",
		}
	);

	const prodeNameInputSchema = z
	.string()
	.refine(
		(value) => {
			return (
				!value.includes(".") &&
				!value.includes("?") &&
				value.length <= 50
			);
		},
		{
			message: "El nombre no puede contener puntos ni signos de pregunta",
		}
	);

export default function NewProde() {
	const { isAuthenticated, firebaseUser } = useAuth();
	const router = useRouter();

	function generateSlug(prodName: ProdeName): string {
		return String(prodName)
			.normalize("NFKD") // split accented characters into their base characters and diacritical marks
			.replace(/[\u0300-\u036f]/g, "") // remove all the accents, which happen to be all in the \u03xx UNICODE block.
			.trim() // trim leading or trailing whitespace
			.toLowerCase() // convert to lowercase
			.replace(/[^a-z0-9 -]/g, "") // remove non-alphanumeric characters
			.replace(/\s+/g, "-") // replace spaces with hyphens
			.replace(/-+/g, "-"); // remove consecutive hyphens
	}

	const handleCreateProde = async () => {
		try {
			prodeNameSchema.parse(prodeName);
		console.log("creando prode");
		const newProde: CreateProdeRequestDto = {
			name: prodeName,
			slug: generateSlug(prodeName),
			owner: firebaseUser.uid,
		};
		const prode = await createProde(newProde, firebaseUser);
		console.log(prode);

		router.push(`/prode/${newProde.slug}`);
	} catch (err) {
		if (err instanceof z.ZodError) {
			setCreateProdeError(err.errors[0].message);
		}
		}
	}

	function handleProdeNameInput(e: React.ChangeEvent<HTMLInputElement>) {
		let input = e.target.value;
		var errorMessage = "";
		try {
			input = prodeNameInputSchema.parse(input);
			setProdeName(input);
			setProdeNameError("");
		} catch (err) {
			if (err instanceof z.ZodError) {
				errorMessage = err.errors[0].message;
				setProdeNameError(errorMessage);
			}
		}
	}

	const [prodeName, setProdeName] = useState<ProdeName>("");
	const [prodeNameError, setProdeNameError] = useState<string>("");
	const [createProdeError, setCreateProdeError] = useState<string>("");

	return (
		<div className=" min-h-screen flex flex-col">
			<NavbarVacia />
			<div className="p-2 flex flex-col justify-between flex-grow">
				<div className="flex flex-col gap-y-3">
					<div className="w-full border-b border-teal-500">
						<h1 className="font-bold text-3xl text-teal-500">
							Nombre Prode
						</h1>
					</div>
					<div>
						<input
							type="text"
							placeholder="Prode Familia Fernadez..."
							className="w-full border border-teal-500 rounded-md p-2 text-teal-500 placeholder:text-teal-500"
							value={prodeName}
							onChange={handleProdeNameInput}
						></input>
						{
							<p className=" line-clamp-2 text-red-500 text-sm p-1">
								{prodeNameError}
							</p>
						}
					</div>
					{/* <div className="flex flex-row gap-x-1 items-baseline">
						<h2 className="text-teal-500 text-md">
							{}

						</h2>
						<p className="max-w-fit text-black text-lg underline">
							{"nombre disponible"}
						</p>
					</div> */}
				</div>
				<div className="mb-4">
					<p className="line-clamp-2 text-red-500 text-sm p-1 text-center">
						{createProdeError}
					</p>
					<button
						className="w-full bg-teal-500 text-white rounded-md font-bold p-2"
						onClick={handleCreateProde}
					>
						Comparti
					</button>
					{
						!isAuthenticated ? (
							<p className="text-grey-200">
								Debes estar registrado para crear un prode{" "}
							</p>
						) : null
						//agregar mensaje de que tiene que estar registrado para crear un prode
					}
				</div>
			</div>
		</div>
	);
}
