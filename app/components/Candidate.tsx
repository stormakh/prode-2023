
import Image, { StaticImageData } from 'next/image'
import Scroller from './Scroller'


export default function Candidate({CandidateName,ImageUrl} : {CandidateName: string, ImageUrl: StaticImageData}){
    return(
          <div className="text-center">
            <h1>{CandidateName}</h1>
            <div className='flex flex-row justify-around p-2 h-1/3'>
                <Image src={ImageUrl} alt={CandidateName} style={{maxWidth:'100%', height : '100%'}}/>
                <Scroller  ></Scroller>
            </div>
            
          </div> 
    )
}