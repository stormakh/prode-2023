'use client'

import { useAuth } from "../contexts/AuthContext";
import NavbarVacia from "../components/NavbarVacia";
import AnonimousBarForm from "../components/AnonimousBarForm";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useHistory } from "../contexts/HistoryContext";





export default function SignWall() {
    const { signInWithGoogle, firebaseUser } = useAuth();
    const {backIfPreviosIsProde,history} = useHistory();
    const router = useRouter();


    useEffect(() => {
        if(firebaseUser && !firebaseUser.isAnonymous) {
            backIfPreviosIsProde();

            router.push('/dashboard');
            }
    }, [firebaseUser]);


    const handleSignInWithGoogle = () => {
        signInWithGoogle();

    }

    return (
        <div className="flex flex-col justify-center items-center">
            <NavbarVacia/>
            <div className="px-16 py-8 flex  flex-col gap-y-5 w-full lg:w-1/2">
                <h1 className=" text-center font-bold text-teal-500 text-2xl w-full border-b border-teal-500">Iniciar Sesión</h1>
                <button className="bg-teal-500 text-white rounded-md p-2" onClick={handleSignInWithGoogle}>Iniciar sesión con Google</button>

                <div className="inline-flex align-baseline items-center justify-center">
                    <span className="h-0.5 w-2/5 bg-teal-500"></span>
                    <p className="text-teal-500 px-2">o</p>
                    <span className="h-0.5 w-2/5 bg-teal-500"></span>
                </div>
                
                <div>
                    <p className="text-teal-500 text-center">Sino registrate de manera anonima</p>
                    <AnonimousBarForm/>
                </div>
                
                
                
            </div>
        </div>
        
    )



}