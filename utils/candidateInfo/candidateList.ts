import { CandidateType } from "@/models/candidate"
import Icono_Milei from '@/public/Icono_Milei.jpg';
import Icono_Bullrich from '@/public//Icono_Bullrich.jpg';
import Icono_Massa from '@/public//Icono_Massa.jpg';
import Icono_Bregman from '@/public//Icono_Bregman.png';
import Icono_Schiaretti from '@/public//Icono_Schiaretti.png';



export const mileiTheme = {
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
  
  
  
  
export  const CandidateList : CandidateType[] = [
    {
      CandidateName: "Javier Milei",
      ImageUrl: Icono_Milei,
      theme: mileiTheme,
      initialVotes : 32.05,
      id : 1,
    },
    {
      CandidateName: "Patricia Bullrich",
      ImageUrl: Icono_Bullrich,
      theme: patoTheme,
      initialVotes : 27.6,
      id : 2,
    },
    {
      CandidateName: "Sergio Massa",
      ImageUrl: Icono_Massa,
      theme: massaTheme,
      initialVotes : 26.5,
        id : 3,
    },
    {
      CandidateName: "Myriam Bregman",
      ImageUrl: Icono_Bregman,
      theme: BregmanTheme,
      initialVotes : 5.2,
        id : 4,
    },
    {
      CandidateName: "Juan Schiaretti",
      ImageUrl: Icono_Schiaretti,
      theme: schiarettiTheme,
      initialVotes : 4.2,
        id : 5,
    },
  ]