import Image from 'next/image'
import Logo from '@/public/logo.png'



export default function NavbarVacia(){


    return(
        <div className=" text-center flex flex-row py-1  pl-2 justify-start gap-x-1 border-b bg-teal-500 text-white w-full items-center ">
              <Image className='h-8 w-auto' src={Logo} alt="Prode Arg" />
          </div>
    )
}