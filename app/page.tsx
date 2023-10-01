'use client'
import { useState} from "react";
import Candidate from "./components/Candidate";
import Image, { StaticImageData } from "next/image";
import Icono_Milei from '../public/Icono_Milei.jpg';
import Icono_Bullrich from '../public/Icono_Bullrich.jpg';
import Icono_Massa from '../public/Icono_Massa.jpg';
import Icono_Bregman from '../public/Icono_Bregman.png';
import Icono_Schiaretti from '../public/Icono_Schiaretti.png';
import Logo from '../public/logo.png';
import {MdExpandMore} from "react-icons/md";


const mileiTheme = {
  color: '#9C339F',
}
const patoTheme = {
  color: '#F6CA0E',
}
const massaTheme = {
  color: '#63CCE4',
}
const BregmanTheme = {
  color: '#EE265A',
}
const schiarettiTheme = {
  color: '#504EAA',
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
        <main className="">
          <div className=" text-center  mb-3 flex flex-row py-1 justify-around gap-x-1 border-b bg-teal-500 text-white w-full items-center">
              <Image src={Logo} alt="Prode Arg" style={{maxWidth : '35% ', height : 'auto' }}/>
            <button className="text-sm border-solid border-2 p-1 rounded-md h-8">Crea el tuyo</button>
            <div className=" p-2 flex items-center rounded-md justify-around bg-juan h-8 " >
              <button className=" ">Prode Juan </button>
              <MdExpandMore fill='#FFFFFF' size='28'/>
            </div>
          </div>
          <div className="text-teal-500 max-w-fit  p-2 flex flex-col">
            <h2 className="text-2xl font-bold">
              {'User'} {'te intivó al Prode!'} 
            </h2>
            <p className="font-bold p-1">
              Elegi los porcentajes que crees que cada uno de los candidatos va a sacar en las elecciones para presidente del 2023.
            </p>
            <p className="font-bold border-b-1/2 p-2  border-teal-500">
              Juga y comparti con tus amigos!
            </p>
          </div>
            <div className="flex flex-col gap-4 p-2">
              {CandidateList.map((candidate,index) => {
                return(
                  <Candidate key={index} CandidateName={candidate.CandidateName} ImageUrl={candidate.ImageUrl} theme={candidate.theme} candidateId={vote[index].CandidateId} votes={handleVote} initialVotes={candidate.initialVotes}/>
                )
              }
            )}  
            </div>
            <div className="flex w-full  justify-center items-center font-bold text-white p-2 mt-24">
              <button className="p-2 rounded-md bg-teal-500 text-xl">Ver Resultados</button>
            </div>
            <div className="px-2 my-5 ">
              <p className="text-center text-xs text-gray-400">Al tocar este boton estas compartiendo tus predicciones con el resto de los integrantes del grupo. Tus predicciones van a poder ser modificadas tras el transcurso de una semana.</p>
            </div>
        </main>
    )
}