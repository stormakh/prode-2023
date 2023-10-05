'use client'
import { FaArrowDown } from "react-icons/fa";
import Navbar from "../components/Navbar";
import { useAuth } from "../contexts/AuthContext";
import { CreateProdeRequestDto } from "@/models/prode";

const prode: CreateProdeRequestDto[] = [
    {
        name: 'prode 1',
        slug : 'prode1',
        owner : 'juanseto'
    },
    {
        name: 'prode 2',
        slug : 'prode2',
        owner : 'pepe'
    },
    {
        name: 'prode 3',
        slug : 'prode3',
        owner : 'santii'
    }

]


export default function Dashboard(){
    const {firebaseUser} = useAuth();


    return (
        <div className="flex flex-col justify-center">
            <Navbar/>
            <div className="px-8 w-full">
                <h1 className="text-left border-b border-teal-500 text-teal-500 font-bold text-2xl mb-4">Mis Prodes</h1>
                <div className="flex flex-col gap-y-3">
                    {prode.map((prode,index) => (
                        <div key={index} className="inline-flex gap-x-2 p-1 w-full justify-center border-b border-teal-500 bg-teal-500 text-white rounded-md">
                            <p className="font-bold px-2 border-r first-letter:capitalize">{prode.name}</p>
                            <p className="">{prode.slug}</p>
                            <button className="bg-juan rounded-md px-2 py-1 inline-flex gap-x-1 items-center">{prode.owner}<FaArrowDown></FaArrowDown></button>
                        </div> 
                    ))}
                    

                </div>
            </div>
        </div>
    )
}