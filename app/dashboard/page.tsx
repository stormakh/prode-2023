import { CandidateList } from "@/utils/candidateInfo/candidateList"
import Navbar from "../components/Navbar"
import CandidateAverage from "../components/CandidateAverage"
import { MdExpandMore } from "react-icons/md"







export default function Dashboard(){
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
            <button className="bg-juan flex justify-between rounded-md w-full text-white p-1"><p>Estimaciones del grupo</p><MdExpandMore fill='#FFFFFF' size='28'/></button>
            <button className="bg-teal-500 text-white font-bold p-2 rounded-md text-2xl">Crea el tuyo</button>
        </div>
           
        
        </>

    )

}