'use client'
import Navbar from "../components/Navbar";
import { useAuth } from "../contexts/AuthContext";



export default function Dashboard(){
    const {firebaseUser} = useAuth();


    return (
        <div className="flex flex-col justify-center">
            <Navbar/>

        </div>
    )
}