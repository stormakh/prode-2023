'use client'
import { useRouter } from "next/navigation";
import NavbarVacia from "../components/NavbarVacia";
import { useAuth } from "../contexts/AuthContext";
import {z} from 'zod';
import { useEffect, useState } from "react";
import {checkIfProdeNameExists, createProde} from '@/utils/api/prodes';

type ProdeName = z.infer<typeof prodeNameSchema>;



const prodeNameSchema = z.string().nonempty().refine((value) => {
    return !value.includes('.') && !value.includes('?') && value.length <= 50;
}, {
    message: 'El nombre no puede contener puntos ni signos de pregunta'
});


export default function NewProde(){
    const {isAuthenticated, firebaseUser} = useAuth();
    const error = true; //esto es solo para usar de ejemplo en el texto de error
    const router = useRouter();

    function generateSlug(prodName : ProdeName) : string{
        return String(prodName)
            .normalize('NFKD') // split accented characters into their base characters and diacritical marks
            .replace(/[\u0300-\u036f]/g, '') // remove all the accents, which happen to be all in the \u03xx UNICODE block.
            .trim() // trim leading or trailing whitespace
            .toLowerCase() // convert to lowercase
            .replace(/[^a-z0-9 -]/g, '') // remove non-alphanumeric characters
            .replace(/\s+/g, '-') // replace spaces with hyphens
            .replace(/-+/g, '-'); // remove consecutive hyphens
    }

    function handleClickCompartir(){
        if(!isAuthenticated){
            router.push('/SignWall');
        } else {

            router.push('/prode/share');
        }
        const newProde : CreateProdeRequestDto = {
            name : prodeName,
            slug : generateSlug(prodeName),
            owner : firebaseUser.uid,
        }
        createProde(newProde).then((res) => {
            console.log(res);
        }).catch((err) => {
            setCreateProdeError(err.message);
        })

    }

    function handleProdeNameInput(e: React.ChangeEvent<HTMLInputElement>){
        let input = e.target.value
        var errorMessage = '';
        try{
            input = prodeNameSchema.parse(input);
            setProdeName(input);
            setProdeNameError('');
        }
        catch(err)
        {
            if(err instanceof z.ZodError){
                errorMessage = err.errors[0].message;
                setProdeNameError(errorMessage);
            }
        }
        
    }

   

    const [prodeName, setProdeName] = useState<ProdeName>('');
    const [prodeNameError, setProdeNameError] = useState<string>('');
    const [createProdeError, setCreateProdeError] = useState<string>('');
    useEffect(() => {
        const checkProdeNameIsAvailable = async () => {
            console.log("checkIfProdeNameExists User:",firebaseUser)
            const prodeNameIsUsed = await checkIfProdeNameExists(prodeName)
            console.log("checkProdeName Response:",prodeNameIsUsed);
            if(prodeNameIsUsed){
                setProdeNameError(`El nombre ${prodeName} ya esta en uso`);
            }
        }
        const timer = setTimeout(() => {
            checkProdeNameIsAvailable();
        },2000)
        return () => clearTimeout(timer);
    }, [prodeName])
   

    return(
        <div className=" min-h-screen flex flex-col">
            <NavbarVacia/>
            <div className="p-2 flex flex-col justify-between flex-grow">
                <div className="flex flex-col gap-y-3">
                    <div className="w-full border-b border-teal-500">
                        <h1 className="font-bold text-3xl text-teal-500">Nombre Prode</h1>
                    </div>
                    <div>
                        <input type="text" placeholder="Prode Familia Fernadez..." className="w-full border border-teal-500 rounded-md p-2 text-juan placeholder:text-teal-500" value={prodeName} onChange={handleProdeNameInput}></input>
                        {
                            <p className=" line-clamp-2 text-red-500 text-sm p-1">{prodeNameError}</p>
                        }
                    </div>
                    <div className="flex flex-row gap-x-1 items-baseline">
                        <h2 className="text-teal-500 text-md">Esta disponible el nombre: </h2>
                        <p className="max-w-fit text-black text-lg underline">{'nombre disponible'}</p>
                    </div>
                </div>
                <div className="mb-4">
                    <p className="line-clamp-2 text-red-500 text-sm p-1">
                        {createProdeError}
                    </p>
                    <button className="w-full bg-teal-500 text-white rounded-md font-bold p-2" onClick={handleClickCompartir}>Comparti</button>
                    {
                        !isAuthenticated ?<p className="text-grey-200">Debes estar registrado para crear un prode </p> : null
                        //agregar mensaje de que tiene que estar registrado para crear un prode
                    }
                </div>
            </div>
        </div>
        

    )
}