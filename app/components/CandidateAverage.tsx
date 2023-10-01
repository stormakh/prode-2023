import { CandidateType } from "@/models/candidate";
import Image from "next/image";


export default function CandidateAverage({Candidate} : {Candidate : CandidateType}){

    const votesToWidth = Candidate.initialVotes.toString() + '%'
   

    return (
        <div className="flex flex-row gap-x-2">
            <div className="w-1/5 ">
                <Image src={Candidate.ImageUrl} alt={Candidate.CandidateName} style={{maxWidth : '100%', height : 'auto'}}/>
            </div>
            <div className="flex flex-grow flex-col justify-around ">
                <div className="flex flex-row justify-between border-b" style={{color : Candidate.theme.color, borderColor : Candidate.theme.color}}>
                    <h1 className="text-black font-semibold text-xl">{Candidate.CandidateName}</h1>
                    <h1 className=" text-2xl">{Candidate.initialVotes} %</h1>
                </div>
                <div className=" ">
                        <div className=" mb-5 h-3 rounded-full bg-gray-200">
                            <div className="h-3 rounded-full " style={{width : votesToWidth, backgroundColor : Candidate.theme.color}}></div>
                        </div>
                </div>
                
            </div>
        </div>
    )
}