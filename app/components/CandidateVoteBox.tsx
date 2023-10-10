
import Image, { StaticImageData } from 'next/image'
import ScrollerFixed from './ScrollerFixed'
import { CSSProperties } from 'react'


export default function CandidateVoteBox({CandidateName,ImageUrl, theme, votes, candidateId, initialVotes} : {CandidateName: string, ImageUrl: StaticImageData, theme : CSSProperties, votes : (candidateId : number, VoteValue : number) => void , candidateId : number, initialVotes : number}){
    return(

            <div className='flex flex-row items-end sm:items-end gap-x-1 sm:w-1/2 justify-center p-2 text-black'>
                <Image className='aspect-square flex-initial w-32 h-32 sm:max-w-fit sm:w-1/3 sm:h-auto '  src={ImageUrl} alt={CandidateName} style={{borderBottomColor : theme.color}}/>
                <div className='flex flex-col justify-center items-start sm:px-2 sm:w-1/2'>
                  { // si el nombre es muy largo, lo achico
                      CandidateName !== 'Myriam Bregman'?
                      <h1 className='border-b min-w-fit ml-1 text-2xl font-bold ' style={{borderColor : theme.color}}>{CandidateName}</h1>:
                      <h1 className='border-b min-w-fit ml-1 text-xl font-bold ' style={{borderColor : theme.color}}>{CandidateName}</h1>
                  }
                <ScrollerFixed theme={theme} votes={votes} candidateId={candidateId} initialVotes={initialVotes}/>
                </div>
                
            </div>    
    ) 
}