"use client"
import { useState } from "react"

import Image from "next/image"

import Logo from "../../public/logo.png"
import { MdExpandMore } from "react-icons/md"

import { CandidateList } from "@/utils/candidateInfo/candidateList"
import CandidateVoteBox from "../components/CandidateVoteBox"
import Navbar from "../components/Navbar"
import { useAuth } from "../contexts/AuthContext"

type voteType = {
  CandidateId: number
  VoteValue: number
}

const CandidateVote: voteType[] = [
  {
    CandidateId: 1,
    VoteValue: 0.0,
  },
  {
    CandidateId: 2,
    VoteValue: 0.0,
  },
  {
    CandidateId: 3,
    VoteValue: 0.0,
  },
  {
    CandidateId: 4,
    VoteValue: 0.0,
  },
  {
    CandidateId: 5,
    VoteValue: 0.0,
  },
]

CandidateVote.forEach((candidate, index) => {
  candidate.VoteValue = CandidateList[index].initialVotes
})

export default function Hub() {
  const [vote, setVote] = useState<voteType[]>(CandidateVote)
  const {firebaseUser} = useAuth();

  function handleVote(CandidateId: number, VoteValue: number) {
    
    var res = 0
    vote.forEach((candidate) => {
      // sumo los votos de todos los candidatos
      if (candidate.CandidateId !== CandidateId) {
        res = res + candidate.VoteValue
      }
    })

    res = res + VoteValue // sumo el voto que se quiere agregar
    
    if (res <= 100 && res >= 0) {
      // verifico que no se pase de 100 o a los negativos
      const nextVotes = vote.map((candidate) => {
        if (candidate.CandidateId === CandidateId) {
          return {
            ...candidate,
            VoteValue: VoteValue,
          }
        } else {
          return candidate
        }
      })

      setVote(nextVotes)
    } else {
      console.log("no se puede votar")
      if (res > 100) {
        throw new Error("Te pasaste por" + (res - 100) + "%")
      }
      if (res < 0) {
        throw new Error("los votos no pueden ser negativos")
      }
    }
  }
  
  function getTotalVotes() {
    var res = 0
    vote.forEach((candidate) => {
      res = res + candidate.VoteValue
    })
    return res.toFixed(2);
  }


  return (
    <main className="">
      <Navbar />
     
      <div className="flex justify-center flex-col items-center p-2 ">
      <div className="text-teal-500 max-w-fit flex flex-col">
        <h2 className="text-2xl font-bold">
          {"User"} {"te intivó al Prode!"}
        </h2>
        <p className="font-bold p-1">
          Elegi los porcentajes que crees que cada uno de los candidatos va a
          sacar en las elecciones para presidente del 2023.
        </p>
        <p className="font-bold border-b-1/2 p-2  border-teal-500">
          Juga y comparti con tus amigos!
        </p>

        <div className="flex flex-col md:flex-wrap md:flex-row gap-4">
          {CandidateList.map((candidate, index) => {
            return (
              <CandidateVoteBox
                key={index}
                CandidateName={candidate.CandidateName}
                ImageUrl={candidate.ImageUrl}
                theme={candidate.theme}
                candidateId={vote[index].CandidateId}
                votes={handleVote}
                initialVotes={candidate.initialVotes}
              />
            )
          })}
        </div>
         
      </div>  
    </div>
      
    <div className="sticky bottom-0   w-full rounded-none  justify-center items-center font-bold text-teal-500 bg-juan p-2 mt-24">
              <p>{'Tus votos totales son :'+ getTotalVotes() + '%'}</p>
    </div>
      
      
      <div className="flex w-full  justify-center items-center font-bold text-white p-2 mt-24">
        <button className="p-2 rounded-md bg-teal-500 text-xl">
          Ver Resultados
        </button>
      </div>
      <div className="px-2 my-5 ">
        <p className="text-center text-xs text-gray-400">
          Al tocar este boton estas compartiendo tus predicciones con el resto
          de los integrantes del grupo. Tus predicciones van a poder ser
          modificadas tras el transcurso de una semana.
        </p>
      </div>

      
      
    </main>
  )
}
