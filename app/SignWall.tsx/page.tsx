import { Router } from "next/router";
import { useAuth } from "../contexts/AuthContext";
import NavbarVacia from "../components/NavbarVacia";





export default function SignWall() {
    const { signInWithGoogle, logout, signInWithAnonymous, firebaseUser } = useAuth();

    


    return (
        <>
            <NavbarVacia/>
            <div className="p-4">
                <h1>SignWall</h1>
                
            </div>
        </>
        
    )



}