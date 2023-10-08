import Image from 'next/image'
import Logo from '@/public/logo.png'


import NavbarUserInformation from './NavbarUserInformation'
import Link from 'next/link'

export default function Navbar({isEnabledCreaElTuyoBtn} : {isEnabledCreaElTuyoBtn?: boolean}){
    


    return(
        <div className=" text-center  mb-3 flex flex-row py-2 px-2 justify-between gap-x-1 border-b bg-teal-500 text-white w-full items-center">
          
          <a href='/home'><Image src={Logo} alt="Prode Arg" className='h-8 w-auto'  /></a>
            <div className='flex gap-x-3 items-baseline'>
                {
                isEnabledCreaElTuyoBtn ? <Link className="text-sm border-solid border-2 p-1 rounded-md h-8 line-clamp-1" href={'/prode'}>Crea el tuyo</Link>  : null
                }
              <NavbarUserInformation/>
            </div>
            
            
            
            
          </div>
    )
}