'use client'
import { useState } from "react";
import Candidate from "./components/Candidate";
import Image from "next/image";
import Icono_Milei from '../public/Icono_Milei.jpg';
import Icono_Bullrich from '../public/Icono_Bullrich.jpg';
import Icono_Massa from '../public/Icono_Massa.jpg';
import Scroller from "./components/Scroller";



export default function Hub(){

  const [Vote, setVote] = useState(0)

    return(
        <main className="container min-h-screen">
          <div className=" text-center mb-3 flex flex-row justify-around p-4  border-b">
            <button className="border-solid border-2 p-1 ">Crea tu Propio Prode</button>
            <h1>Hub</h1>
          </div>
            <div className="flex flex-col gap-4  max-w-full  ">
              
              <Candidate CandidateName="Javier Milei" ImageUrl={Icono_Milei}></Candidate>
              <Candidate CandidateName="Patricia Bullrich" ImageUrl={Icono_Bullrich}></Candidate>
              <Candidate CandidateName="Sergio Massa" ImageUrl={Icono_Massa}></Candidate>
             
                
              
              {/* <Candidate CandidateName="Sergio Massa"/>
              <Candidate CandidateName="Patricia Bullrich"/> */}
            </div>
            <div>
              <h1 className=" text-red-700 text-center">Te Pasaste por 15%</h1>
            </div>
        </main>
    )
}