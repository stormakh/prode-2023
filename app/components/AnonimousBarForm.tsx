import { useAuth } from "../contexts/AuthContext";
import {AiOutlineArrowRight} from 'react-icons/ai';
import {useRouter} from 'next/navigation' 
import { z } from "zod";
import { useState } from "react";
import { useHistory } from "../contexts/HistoryContext";

type AnonUsername = z.infer<typeof AnonUsernameSchema>;

const AnonUsernameSchema = z
	.string()
	.nonempty( { message: "El nombre no puede estar vacio" })
	.refine(
		(value) => {
			return (
				!value.includes(".") &&
				!value.includes("?") &&
				value.length <= 50
			);
		},
		{
			message: "El nombre no puede contener puntos ni signos de pregunta",
		}
	);

	const AnonUsernameInputSchema = z
	.string()
	.refine(
		(value) => {
			return (
				!value.includes(".") &&
				!value.includes("?") &&
                !value.includes("@") &&
				value.length <= 50
			);
		},
		{
			message: "El nombre no puede contener puntos ni signos de pregunta",
		}
	);


export default function AnonimousBarForm() {
    const  {setAnonUsername} = useAuth();
    const router = useRouter();
    const [AnonUsernameError, setAnonUsernameError] = useState("");
	const {backIfPreviosIsProde} = useHistory();

    function handleSubmit(e : any){
        e.preventDefault();
        let input = e.target[0].value;
        console.log(input + 'input at anonUser');
		var errorMessage = "";
		try {
			input = AnonUsernameSchema.parse(input);
			setAnonUsername(input);
			setAnonUsernameError("");
		} catch (err) {
			if (err instanceof z.ZodError) {
				errorMessage = err.errors[0].message;
				setAnonUsernameError(errorMessage);
			}
		}
        if(errorMessage === ""){
			backIfPreviosIsProde();
            router.push('/dashboard');
        }
       
    }

    return (
        <>
            <form className="flex" onSubmit={handleSubmit}>
            <input type="text" placeholder="Tu Nombre..." className="w-5/6 border border-teal-500 text-teal-500  rounded-md rounded-r-none p-2 focus:outline-none   placeholder:text-teal-500 placeholder:font-bold placeholder:text-center"></input>
            <button className="bg-teal-500 flex-grow rounded-md rounded-l-none flex justify-center items-center">{<AiOutlineArrowRight  size='24' style={{color : 'white'}}/>}</button> 
            
            </form>
            {AnonUsernameError && <p className="text-red-500 text-xs">{AnonUsernameError}</p>}
        </>
        
    )   
}