import Image from 'next/image'
import Logo from '@/public/logo.png'

import NavbarProdeUsers from './NavbarProdeUsers'
import NavbarUserInformation from './NavbarUserInformation'

export default function Navbar(){
    


    return(
        <div className=" text-center  mb-3 flex flex-row py-1 justify-around gap-x-1 border-b bg-teal-500 text-white w-full items-center">
          
          <a href='/home'><Image src={Logo} alt="Prode Arg" className='h-8 w-auto'  /></a>    
            <button className="text-sm border-solid border-2 p-1 rounded-md h-8">Crea el tuyo</button>
            <NavbarProdeUsers/>
            <NavbarUserInformation/>
            
          </div>
    )
}