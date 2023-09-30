'use client'
import { useState, useEffect, useRef } from "react";
import Candidate from "./components/Candidate";
import Image, { StaticImageData } from "next/image";
import Icono_Milei from '../public/Icono_Milei.jpg';
import Icono_Bullrich from '../public/Icono_Bullrich.jpg';
import Icono_Massa from '../public/Icono_Massa.jpg';
import Scroller from "./components/Scroller";

const mileiTheme = {
  color: '#FF00C8',
}
const patoTheme = {
  color: '#fbbf24',
}
const massaTheme = {
  color: '#38bdf8',
}

type CandidateType = {
  CandidateName: string,
  ImageUrl: StaticImageData,
  theme: {
    color: string,
  }
  votes : number
}


const CandidateList : CandidateType[] = [
  {
    CandidateName: "Javier Milei",
    ImageUrl: Icono_Milei,
    theme: mileiTheme,
    votes: 0.00,
  },
  {
    CandidateName: "Patricia Bullrich",
    ImageUrl: Icono_Bullrich,
    theme: patoTheme,
    votes: 0.00,
  },
  {
    CandidateName: "Sergio Massa",
    ImageUrl: Icono_Massa,
    theme: massaTheme,
    votes: 0.00,
  },
]



export default function Hub(){

 let  InitialVoteValue  = 0.00
 CandidateList.forEach(candidate =>  InitialVoteValue += candidate.votes);
  
 
  
  
   
  function handleVote(){

  }

    return(
        <main className="container">
          <div className=" text-center mb-3 flex flex-row justify-around p-4  border-b">
            <button className="border-solid border-2 p-1 ">Crea tu Propio Prode</button>
            <h1>Hub</h1>
          </div>
            <div className="flex flex-col gap-4  max-w-full  ">
              
              {CandidateList.map((candidate,index) => {
                return(
                  <Candidate key={index} CandidateName={candidate.CandidateName} ImageUrl={candidate.ImageUrl} theme={candidate.theme} votes={candidate.votes}/>
                )
              }
            )}  
            </div>
            <div>
              <h1 className=" text-red-700 text-center">Te Pasaste por 15%</h1>
            </div>
        </main>
    )
}