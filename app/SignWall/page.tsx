'use client'

import { useAuth } from "../contexts/AuthContext";
import NavbarVacia from "../components/NavbarVacia";
import React from "react";





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