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

export default function ScrollerFixed({theme, votes} : {theme : CSSProperties, votes : number}) {
    const [currentSelected, setCurrentSelected] = useState<voteDouble>({big: 35, small: 3});
    

    votes = currentSelected.big + currentSelected.small/100;
    

    const handlePlusButton = (setter : Dispatch<SetStateAction<voteDouble>>, numberPart : numberPart) => {
        
        if (currentSelected[numberPart] < 100) {
            setter(prevState => ({...prevState, [numberPart]: prevState[numberPart] + 1}));
        } else {
            setter(prevState => ({...prevState, [numberPart]: 0}));
        }
    }

    const handleMinusButton = (value: number, setter : Dispatch<SetStateAction<voteDouble>>, numberPart : numberPart ) => {
        if (value > 0) {
            setter(prevState => ({...prevState, small: prevState.small - 1}));
        } else {
            setter(prevState => ({...prevState, small: 99, big: prevState.big - 1}));
        }
    }

    function MinusButton({currentSelected, setter, numberPart} : {currentSelected: number, setter : Dispatch<SetStateAction<voteDouble>>,numberPart : numberPart}){
        return(
            <button className="p-2 border " onClick={e => handleMinusButton(currentSelected, setter, numberPart)}>-</button>
        )
    }
    function PlusButton({currentSelected, setter, numberPart} : {currentSelected: number, setter : Dispatch<SetStateAction<voteDouble>>, numberPart : numberPart}){
        return(
            <button className="p-2 border " onClick={e => handlePlusButton(setter, numberPart)}>+</button>
        )
    }

    return (
        <div className="flex flex-grow justify-center items-center" style={{...theme}}>
            <div className="p-4">
            <PlusButton currentSelected={currentSelected.big} setter={setCurrentSelected} numberPart={numberPart.big}/>
            <p className="p-4">{currentSelected.big}</p>
            <MinusButton currentSelected={currentSelected.big} setter={setCurrentSelected} numberPart={numberPart.big}/>
            </div>
            <div>
            <PlusButton currentSelected={currentSelected.small} setter={setCurrentSelected} numberPart={numberPart.small}/>
            <p  className="p-4">{currentSelected.small}</p>
            <MinusButton currentSelected={currentSelected.small} setter={setCurrentSelected} numberPart={numberPart.small}/>
            </div>
        </div>
    )
}