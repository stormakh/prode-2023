
import Image, { StaticImageData } from 'next/image'
import Scroller from './Scroller'
import ScrollerFixed from './ScrollerFixed'
import { CSSProperties } from 'react'


export default function Candidate({CandidateName,ImageUrl, theme, votes} : {CandidateName: string, ImageUrl: StaticImageData, theme : CSSProperties, votes : number}){
    return(
          <div className="text-center">
            <h1>{CandidateName}</h1>
            <div className='flex flex-row justify-around p-2 '>
                <Image src={ImageUrl} alt={CandidateName} style={{maxWidth:'50%', height : '100%'}}/>
                <ScrollerFixed theme={theme} votes={votes}/>
            </div>
            
          </div> 
    )
}