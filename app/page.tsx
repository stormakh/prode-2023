'use client'
import { useState, useEffect, useRef } from "react";
import Candidate from "./components/Candidate";
import Image, { StaticImageData } from "next/image";
import Icono_Milei from '../public/Icono_Milei.jpg';
import Icono_Bullrich from '../public/Icono_Bullrich.jpg';
import Icono_Massa from '../public/Icono_Massa.jpg';
import Icono_Bregman from '../public/Icono_Bregman.png';
import Icono_Schiaretti from '../public/Icono_Schiaretti.png';


const mileiTheme = {
  color: '#FF00C8',
}
const patoTheme = {
  color: '#fbbf24',
}
const massaTheme = {
  color: '#38bdf8',
}
const BregmanTheme = {
  color: '#f87171',
}
const schiarettiTheme = {
  color: '#6ee7b7',
}

type CandidateType = {
  CandidateName: string,
  ImageUrl: StaticImageData,
  theme: {
    color: string,
  }
  initialVotes : number,
  
}


const CandidateList : CandidateType[] = [
  {
    CandidateName: "Javier Milei",
    ImageUrl: Icono_Milei,
    theme: mileiTheme,
    initialVotes : 32.5,
    
  },
  {
    CandidateName: "Patricia Bullrich",
    ImageUrl: Icono_Bullrich,
    theme: patoTheme,
    initialVotes : 27.6,
  },
  {
    CandidateName: "Sergio Massa",
    ImageUrl: Icono_Massa,
    theme: massaTheme,
    initialVotes : 26.5,
  },
  {
    CandidateName: "Myriam Bregman",
    ImageUrl: Icono_Bregman,
    theme: BregmanTheme,
    initialVotes : 5.2,
  },
  {
    CandidateName: "Juan Schiaretti",
    ImageUrl: Icono_Schiaretti,
    theme: schiarettiTheme,
    initialVotes : 4.2,
  },
]

type voteType = {
  CandidateId : number,
  VoteValue : number,
  
}

const CandidateVote : voteType[] = [
  {
    CandidateId : 1,
    VoteValue : 0.00,
  },
  {
    CandidateId : 2,
    VoteValue : 0.00,
  },
  {
    CandidateId : 3,
    VoteValue : 0.00,
  },
  {
    CandidateId : 4,
    VoteValue : 0.00,
  },
  {
    CandidateId : 5,
    VoteValue : 0.00,
  },
]

CandidateVote.forEach((candidate,index) => {
  candidate.VoteValue = CandidateList[index].initialVotes
});


export default function Hub(){

  const [vote, setVote] = useState<voteType[]>(CandidateVote)

   

  function handleVote(CandidateId : number, VoteValue : number){
    console.log('i  got ' + VoteValue + 'from ' + CandidateId)
    var res = 0
    vote.forEach(candidate => { // sumo los votos de todos los candidatos
      if(candidate.CandidateId !== CandidateId)
      {
        res = res + candidate.VoteValue
      }
    })
    
    res = res + VoteValue // sumo el voto que se quiere agregar
    console.log(res + ' es el resultado')
    if (res  <= 100 && res >= 0){ // verifico que no se pase de 100 o a los negativos
      const nextVotes = vote.map((candidate) => {
        if(candidate.CandidateId === CandidateId)
        {
          return {
            ...candidate,
            VoteValue : VoteValue,
          }
        } else {
          return candidate
        }
      });
      
      setVote(nextVotes)
      
    } else {
      console.log('no se puede votar')
      if(res > 100){
        throw new Error('Te pasaste por' + (res - 100) + '%')
      }
      if(res < 0){
        throw new Error('los votos no pueden ser negativos')
      }
   }
  }


    return(
        <main className="container">
          <div className=" text-center mb-3 flex flex-row justify-around p-4  border-b">
            <button className="border-solid border-2 p-1 ">Crea tu Propio Prode</button>
            <h1>Hub</h1>
          </div>
            <div className="flex flex-col gap-4    p-2">
              
              {CandidateList.map((candidate,index) => {
                return(
                  <Candidate key={index} CandidateName={candidate.CandidateName} ImageUrl={candidate.ImageUrl} theme={candidate.theme} candidateId={vote[index].CandidateId} votes={handleVote} initialVotes={candidate.initialVotes}/>
                )
              }
            )}  
            </div>
            <div>
              <h1 className=" text-red-700 text-center">Te Pasaste por 15%</h1>
            </div>
            <div className="flex w-full  justify-center items-center">
              <button className="border-solid border-2 p-1">Enviar</button>
            </div>
        </main>
    )
}