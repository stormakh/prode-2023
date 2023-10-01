
import Image, { StaticImageData } from 'next/image'
import ScrollerFixed from './ScrollerFixed'
import { CSSProperties } from 'react'


export default function CandidateVoteBox({CandidateName,ImageUrl, theme, votes, candidateId, initialVotes} : {CandidateName: string, ImageUrl: StaticImageData, theme : CSSProperties, votes : (candidateId : number, VoteValue : number) => void , candidateId : number, initialVotes : number}){
    return(
          <div className="text-center text-black">
            
            <div className='flex flex-row justify-around p-2 '>
                <Image className='h-60 w-auto' src={ImageUrl} alt={CandidateName} style={{maxWidth:'50%', borderBottomColor : theme.color }}/>
                <div className='flex flex-col flex-grow justify-center items-start p-2'>
                  { // si el nombre es muy largo, lo achico
                      CandidateName !== 'Myriam Bregman'?
                      <h1 className='border-b max-w-fit ml-1 text-2xl font-bold ' style={{borderColor : theme.color}}>{CandidateName}</h1>:
                      <h1 className='border-b max-w-fit ml-1 text-xl font-bold ' style={{borderColor : theme.color}}>{CandidateName}</h1>
                  }
                <ScrollerFixed theme={theme} votes={votes} candidateId={candidateId} initialVotes={initialVotes}/>
                </div>
                
            </div>
            
          </div> 
    ) 
}