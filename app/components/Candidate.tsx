
import Image, { StaticImageData } from 'next/image'
import Scroller from './Scroller'
import ScrollerFixed from './ScrollerFixed'
import { CSSProperties } from 'react'


export default function Candidate({CandidateName,ImageUrl, theme, votes, candidateId, initialVotes} : {CandidateName: string, ImageUrl: StaticImageData, theme : CSSProperties, votes : (candidateId : number, VoteValue : number) => void , candidateId : number, initialVotes : number}){
    return(
          <div className="text-center">
            
            <div className='flex flex-row justify-around p-2 '>
                
                <Image className='border-b-7' src={ImageUrl} alt={CandidateName} style={{maxWidth:'100%', height : '100%', borderBottomColor : theme.color }}/>
                <div className=' '>
                <h1>{CandidateName}</h1>
                <ScrollerFixed theme={theme} votes={votes} candidateId={candidateId} initialVotes={initialVotes}/>
                </div>
                
            </div>
            
          </div> 
    ) 
}