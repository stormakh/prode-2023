import { useAuth } from "../contexts/AuthContext";
import {AiOutlineArrowRight} from 'react-icons/ai';
import {useRouter} from 'next/navigation' 



export default function AnonimousBarForm() {
    const  {setAnonUsername} = useAuth();
    const router = useRouter();
    function handleSubmit(e : any){
        e.preventDefault();
        setAnonUsername(e.target[0].value);
        router.back();
    }

    return (
        <form className="flex" onSubmit={handleSubmit}>
            <input type="text" placeholder="Tu Nombre..." className="w-5/6 border border-teal-500 text-teal-500  rounded-md rounded-r-none p-2 focus:outline-none   placeholder:text-teal-500 placeholder:font-bold placeholder:text-center"></input>
            <button className="bg-teal-500 flex-grow rounded-md rounded-l-none flex justify-center items-center">{<AiOutlineArrowRight  size='24' style={{color : 'white'}}/>}</button> 
        </form>
    )   
}