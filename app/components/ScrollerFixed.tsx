'use client'
import { CSSProperties, Dispatch, SetStateAction, useState } from "react";

type voteDouble = {
    big : number,
    small : number,
}

const enum numberPart {
    big = "big",
    small = "small",
}

export default function ScrollerFixed({theme, votes,candidateId, initialVotes} : {theme : CSSProperties, votes : (candidateId : number, voteValue : number)=> void, candidateId : number, initialVotes : number}) {
    
    
    
    const [currentSelected, setCurrentSelected] = useState<voteDouble>({big: initialVotes-(initialVotes%1), small: ((initialVotes%1)*100)});
    
    const handlePlusButton = (setter : Dispatch<SetStateAction<voteDouble>>, numberPart : numberPart) => {
        
        var newVoteValue = currentSelected.big + currentSelected.small/100;
        if(numberPart == "big"){
           newVoteValue = newVoteValue + 1;
        } else {
            newVoteValue = newVoteValue + 0.01;
        }
        try {
           
            votes(candidateId, newVoteValue);
            if (numberPart == "big") {
                setter(prevState => ({...prevState, big: prevState.big + 1}));
            }
            else {
                if(currentSelected.small == 99)
                {
                    return;
                }
                setter(prevState => ({...prevState, small: prevState.small + 1}));
            }
        }catch(error)
        {
            console.log(error)
        }
        

    }

    const handleMinusButton =  (setter : Dispatch<SetStateAction<voteDouble>>, numberPart : numberPart ) => {
    
        if(currentSelected.small-1 < 0 && numberPart == "small"){
            return;
        }
        if(currentSelected.big == 0 && numberPart == "big"){
            return;
        }
        var newVoteValue = currentSelected.big + currentSelected.small/100;
        if(numberPart == "big"){
           newVoteValue = newVoteValue - 1;
        } else {
            newVoteValue = newVoteValue - 0.01;
        }
        try {
            votes(candidateId, newVoteValue);
        }catch(error)
        {
            console.log(error);
        }
        if (numberPart == "big") {
            setter(prevState => ({...prevState, big: prevState.big - 1}));
        }
        else {
            setter(prevState => ({...prevState, small: prevState.small - 1}));
        }
    }

    function MinusButton({setter, numberPart} : { setter : Dispatch<SetStateAction<voteDouble>>,numberPart : numberPart}){
        return(
            <button className="px-8  border-2 rounded-md w-full " onClick={e => handleMinusButton(setter, numberPart) } style={{borderColor : theme.color}}>-</button>
        )
    }
    function PlusButton({ setter, numberPart} : { setter : Dispatch<SetStateAction<voteDouble>>, numberPart : numberPart}){
        return(
            <button className="px-8  border-2 rounded-md w-full " onClick={e => handlePlusButton(setter, numberPart)} style={{borderColor : theme.color}}>+</button>
        )
    }

    return (
        <div className="flex flex-grow justify-center items-center text-xl" style={{...theme}}>
            <div className="p-1 flex-grow">
            <PlusButton  setter={setCurrentSelected} numberPart={numberPart.big}/>
            <p className="p-3 text-3xl">{currentSelected.big}</p>
            <MinusButton  setter={setCurrentSelected} numberPart={numberPart.big}/>
            </div>
            <div className="">
            <p className="m-0 text-3xl">,</p>
            </div>
            <div className="p-1 flex-grow">
            <PlusButton setter={setCurrentSelected} numberPart={numberPart.small}/>
            <p  className="p-3 text-3xl">{currentSelected.small-(currentSelected.small%1)}</p>
            <MinusButton setter={setCurrentSelected} numberPart={numberPart.small}/>
            </div>
        </div>
    )
}