"use client";
import { CSSProperties, Dispatch, SetStateAction, useState } from "react";

const validateNumber = (number: number) => {
	if (number < 0 || number >= 100) {
		return false;
	}
	return true;
};

type voteDouble = {
	big: number;
	small: number;
};

const enum numberPart {
	big = "big",
	small = "small",
}

export default function ScrollerFixed({
	theme,
	votes,
	candidateId,
	initialVotes,
}: {
	theme: CSSProperties;
	votes: (candidateId: number, voteValue: number) => void;
	candidateId: number;
	initialVotes: number;
}) {
	const [currentSelected, setCurrentSelected] = useState<voteDouble>({
		big: initialVotes - (initialVotes % 1),
		small: Math.round((initialVotes - Math.floor(initialVotes)) * 100),
	});

	const handlePlusButton = (
		setter: Dispatch<SetStateAction<voteDouble>>,
		numberPart: numberPart
	) => {
		var newVoteValue = currentSelected.big + currentSelected.small / 100;

		if (numberPart == "big") {
			newVoteValue = newVoteValue + 1;
		} else {
			newVoteValue = newVoteValue + 0.01;
		}
		try {
			votes(candidateId, newVoteValue);
			if (numberPart == "big") {
				setter((prevState) => ({
					...prevState,
					big: prevState.big + 1,
				}));
			} else {
				if (currentSelected.small == 99) {
					console.log("small is 99");
					return;
				}
				setter((prevState) => ({
					...prevState,
					small: prevState.small + 1,
				}));
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleMinusButton = (
		setter: Dispatch<SetStateAction<voteDouble>>,
		numberPart: numberPart
	) => {
		if (currentSelected.small - 1 < 0 && numberPart == "small") {
			return;
		}
		if (currentSelected.big == 0 && numberPart == "big") {
			return;
		}
		var newVoteValue = currentSelected.big + currentSelected.small / 100;
		if (numberPart == "big") {
			newVoteValue = newVoteValue - 1;
		} else {
			newVoteValue = newVoteValue - 0.01;
		}
		try {
			votes(candidateId, newVoteValue);
		} catch (error) {
			console.log(error);
		}
		if (numberPart == "big") {
			setter((prevState) => ({ ...prevState, big: prevState.big - 1 }));
		} else {
			setter((prevState) => ({
				...prevState,
				small: prevState.small - 1,
			}));
		}
	};
	const updateParent = (newVote: voteDouble) => {
		var newVoteValue = newVote.big + newVote.small / 100;
		console.log(newVote);
		votes(candidateId, newVoteValue);
	};

	function MinusButton({
		setter,
		numberPart,
	}: {
		setter: Dispatch<SetStateAction<voteDouble>>;
		numberPart: numberPart;
	}) {
		return (
			<button
				className="px-8  border-2 rounded-md w-full sm:w-1/2"
				onClick={(e) => handleMinusButton(setter, numberPart)}
				style={{ borderColor: theme.color }}
			>
				-
			</button>
		);
	}
	function PlusButton({
		setter,
		numberPart,
	}: {
		setter: Dispatch<SetStateAction<voteDouble>>;
		numberPart: numberPart;
	}) {
		return (
			<button
				className="px-8  border-2 rounded-md w-full sm:w-1/2"
				onClick={(e) => handlePlusButton(setter, numberPart)}
				style={{ borderColor: theme.color }}
			>
				+
			</button>
		);
	}

	return (
		<div
			className="flex justify-start items-center text-xl sm:w-fit"
			style={{ ...theme }}
		>
			<div className="p-1 flex flex-col items-center justify-start sm:w-20  ">
				<PlusButton
					setter={setCurrentSelected}
					numberPart={numberPart.big}
				/>
				<input
					className="py-3 text-center text-3xl w-8/12 focus:border-t-transparent focus:outline-0"
					value={currentSelected.big}
					type="number"
					onChange={(e) => {
						const newNumber = Number(e.target.value);
						if (validateNumber(newNumber)) {
							const newValue: voteDouble = {
								...currentSelected,
								big: newNumber,
							};
							setCurrentSelected(newValue);
							updateParent(newValue);
						}
					}}
				/>
				<MinusButton
					setter={setCurrentSelected}
					numberPart={numberPart.big}
				/>
			</div>
			<div className="">
				<p className="m-0 text-3xl">,</p>
			</div>
			<div className="p-1 flex flex-col items-center justify-start sm:w-20">
				<PlusButton
					setter={setCurrentSelected}
					numberPart={numberPart.small}
				/>
				<input
					className="py-3 text-3xl w-8/12 focus:border-t-transparent focus:outline-0"
					value={currentSelected.small - (currentSelected.small % 1)}
					type="number"
					onChange={(e) => {
						const newNumber = Number(e.target.value);
						if (validateNumber(newNumber)) {
							const newValue: voteDouble = {
								...currentSelected,
								small: newNumber,
							};
							setCurrentSelected(newValue);
							updateParent(newValue);
						}
					}}
				/>

				<MinusButton
					setter={setCurrentSelected}
					numberPart={numberPart.small}
				/>
			</div>
		</div>
	);
}
