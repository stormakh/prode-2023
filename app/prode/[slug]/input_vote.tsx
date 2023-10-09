"use client";
import { useEffect, useMemo, useState } from "react";
import { CandidateList } from "@/utils/candidateInfo/candidateList";
import CandidateVoteBox from "../../components/CandidateVoteBox";
import Navbar from "../../components/Navbar";
import { useAuth } from "../../contexts/AuthContext";
import { createVote, getVote } from "@/utils/api/votes";
import NoUserModal from "@/app/components/NoUserModal";


type VoteType = {
	candidateId: number;
	voteValue: number;
};


   
  




export default function InputVote({
	params,
}: {
	params: {
		slug: string;
		setShowProdeStats: (shouldShow: boolean) => void;
		ownerName: string | undefined;
	};
}) {
	function loadVote(){
		const localVote : VoteType[] = JSON.parse(localStorage.getItem('candidateVote') || '[]');
		return localVote;
	}
	const initialCandidateVote: VoteType[] = loadVote();
	const [vote, setVote] = useState<VoteType[]>(initialCandidateVote);
	const [errorMessage, setErrorMessage] = useState<string>("");
	const { firebaseUser, AnonUsername } = useAuth();
 

	useEffect(() => {
		
		const getVoteAsync = async () => {
			if (!firebaseUser) return;
			const vote = await getVote(params.slug, firebaseUser.uid);
			
		};
		getVoteAsync();
	}, [firebaseUser]);

	function handleVote(candidateId: number, voteValue: number) {
		var res = 0;
		vote.forEach((candidate) => {
			// sumo los votos de todos los candidatos
			if (candidate.candidateId !== candidateId) {
				res = res + candidate.voteValue;
			}
		});

		res = res + voteValue; // sumo el voto que se quiere agregar

		// if (res <= 100 && res >= 0) {
		// verifico que no se pase de 100 o a los negativos
		const nextVotes = vote.map((candidate) => {
			if (candidate.candidateId === candidateId) {
				return {
					...candidate,
					voteValue: voteValue,
				};
			} else {
				return candidate;
			}
		});

		setVote(nextVotes);
		// } else {
		// 	console.log("no se puede votar");
		// 	if (res > 100) {
		// 		throw new Error("Te pasaste por" + (res - 100) + "%");
		// 	}
		// 	if (res < 0) {
		// 		throw new Error("los votos no pueden ser negativos");
		// 	}
		// }
	}

  

  function persistVote() {
    localStorage.setItem('candidateVote', JSON.stringify(vote));
  }

	function handleErrorModal() {
		if (errorMessage == "Debes registrarte para votar") {
			console.log("ERROR MODAL");
			return true;
		} else {
			return false;
		}
	}

	function endModal() {
		setErrorMessage("");
	}

	async function handleClickUploadResults() {
    persistVote();
		if (totalVotes !== "100.00") {
			setErrorMessage("Tus votos NO suman 100%");
			return;
		}
		if (firebaseUser?.isAnonymous && !firebaseUser?.username) {
			setErrorMessage("Debes registrarte para votar");
			return;
		}

		setErrorMessage("");

		const votes: Record<string, number> = {};
		CandidateList.forEach((candidate, index) => {
			votes[candidate.candidateIdentifier as keyof typeof votes] =
				vote[index].voteValue;
		});
		console.log("FINAL VOTES:", votes);
		await createVote(
			{
				voterUid: firebaseUser.uid,
				votes: votes as CandidateVotes,
				voterDisplayName:
					firebaseUser?.username ??
					firebaseUser?.displayName ??
					firebaseUser?.email?.split("@")[0],
			},
			params.slug
		).then(() => {
			params.setShowProdeStats(true);
		});
	}

	const totalVotes = useMemo(() => {
		var res = 0;
		vote.forEach((candidate) => {
			res = res + candidate.voteValue;
		});
		return res.toFixed(2);
	}, [vote]);

	return (
		<main className="">
			<Navbar isEnabledCreaElTuyoBtn={!firebaseUser?.isAnonymous} />
			{handleErrorModal() ? <NoUserModal endModal={endModal} /> : null}
			<div className="flex justify-center flex-col items-center p-2 ">
				<div className="text-teal-500 max-w-fit flex flex-col">
					<h2 className="text-2xl font-bold">
						{params.ownerName != null &&
						params.ownerName != undefined
							? params.ownerName + " te intivó al Prode!"
							: params.slug}
					</h2>
					<p className="font-bold p-1">
						Elegí los porcentajes que crees que cada uno de los
						candidatos va a sacar en las elecciones para presidente
						del 2023.
					</p>
					<p className="font-bold border-b-1/2 p-2  border-teal-500">
						Jugá y compartí con tus amigos!
					</p>

					<div className="flex flex-col md:flex-wrap md:flex-row gap-4">
						{CandidateList.map((candidate, index) => {
							return (
								<CandidateVoteBox
									key={index}
									CandidateName={candidate.candidateName}
									ImageUrl={candidate.imageUrl}
									theme={candidate.theme}
									candidateId={vote[index].candidateId}
									votes={handleVote}
									initialVotes={initialCandidateVote[index].voteValue}
								/>
							);
						})}
					</div>
				</div>
			</div>

			<div className={`sticky bottom-0 w-full rounded-none  justify-center items-center font-bold  bg-juan p-2 mt-24 ${ Number(totalVotes) <= 100 ? 'bg-juan text-teal-500' : 'bg-red-400 text-gray-900 animate-pulse'}`}>
				<p>{"Tus votos totales son :" + totalVotes + "%"}</p>
			</div>
			<div className="text-center line-clamp-2 text-red-500 text-xl font-bold p-1">
				{errorMessage}
			</div>
			<div className="flex w-full  justify-center items-center font-bold text-white p-2 mt-24">
				<button
					className="p-2 rounded-md bg-teal-500 text-xl"
					onClick={handleClickUploadResults}
				>
					Ver Resultados
				</button>
			</div>
			<div className="px-2 my-5 ">
				<p className="text-center text-xs text-gray-400">
					Al tocar este boton estas compartiendo tus predicciones con
					el resto de los integrantes del grupo. Tus predicciones van
					a poder ser modificadas tras el transcurso de una semana.
				</p>
			</div>
		</main>
	);
}
