import Image from 'next/image'
import Logo from '@/public/logo.png'
import { MdExpandMore } from 'react-icons/md'


export default function Navbar(){


    return(
        <div className=" text-center  mb-3 flex flex-row py-1 justify-around gap-x-1 border-b bg-teal-500 text-white w-full items-center">
              <Image src={Logo} alt="Prode Arg" className='h-8 w-auto'/>
            <button className="text-sm border-solid border-2 p-1 rounded-md h-8">Crea el tuyo</button>
            <div className=" p-2 flex items-center rounded-md justify-around bg-juan h-8 " >
              <button className=" ">Prode Juan </button>
              <MdExpandMore fill='#FFFFFF' size='28'/>
            </div>
          </div>
    )
}