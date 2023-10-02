import { CandidateType } from "@/models/candidate"
import Icono_Milei from "@/public/Icono_Milei.jpg"
import Icono_Bullrich from "@/public//Icono_Bullrich.jpg"
import Icono_Massa from "@/public//Icono_Massa.jpg"
import Icono_Bregman from "@/public//Icono_Bregman.png"
import Icono_Schiaretti from "@/public//Icono_Schiaretti.png"

export const mileiTheme = {
  color: "#9C339F",
}
const patoTheme = {
  color: "#F6CA0E",
}
const massaTheme = {
  color: "#63CCE4",
}
const BregmanTheme = {
  color: "#EE265A",
}
const schiarettiTheme = {
  color: "#504EAA",
}

export const CandidateList: CandidateType[] = [
  {
    candidateName: "Javier Milei",
    candidateIdentifier: "Milei",
    imageUrl: Icono_Milei,
    theme: mileiTheme,
    initialVotes: 32.5,
    id: 1,
  },
  {
    candidateName: "Patricia Bullrich",
    candidateIdentifier: "Bullrich",
    imageUrl: Icono_Bullrich,
    theme: patoTheme,
    initialVotes: 27.6,
    id: 2,
  },
  {
    candidateName: "Sergio Massa",
    candidateIdentifier: "Massa",
    imageUrl: Icono_Massa,
    theme: massaTheme,
    initialVotes: 26.5,
    id: 3,
  },
  {
    candidateName: "Myriam Bregman",
    candidateIdentifier: "Bregman",
    imageUrl: Icono_Bregman,
    theme: BregmanTheme,
    initialVotes: 5.2,
    id: 4,
  },
  {
    candidateName: "Juan Schiaretti",
    candidateIdentifier: "Schiaretti",
    imageUrl: Icono_Schiaretti,
    theme: schiarettiTheme,
    initialVotes: 4.2,
    id: 5,
  },
]
