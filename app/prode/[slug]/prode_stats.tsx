import { CandidateList } from "@/utils/candidateInfo/candidateList"
import Navbar from "../../components/Navbar"
import CandidateAverage from "../../components/CandidateAverage"

import TablaVotantes from "../../components/TablaVotantes"







export default function ProdeStats(){
    return (
        <>
        <Navbar/>
        <div className="p-4">
            
            <div className=" border-b-1/2 border-teal-500">
                <h1 className="text-teal-500 text-3xl font-bold">Resultados</h1>
            </div>
            <div className="flex flex-col mt-4 gap-y-4 justify-between">
                {
                    CandidateList.map((candidate,index) => {
                        return (
                            <CandidateAverage Candidate={candidate} key={index}/>
                        )
                    })
                }
            </div>
            
        </div>
        <div className="flex flex-col justify-center w-full p-4 gap-y-20">
            <TablaVotantes />
            <button className="bg-teal-500 text-white font-bold p-2 rounded-md text-2xl">Crea el tuyo</button>
        </div>
           
        
        </>

    )

}