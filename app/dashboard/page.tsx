"use client";
import { AiFillPlusCircle } from "react-icons/ai";
import Navbar from "../components/Navbar";
import { useAuth } from "../contexts/AuthContext";
import { CreateProdeRequestDto } from "@/models/prode";
import { TbExternalLink } from "react-icons/tb";
import Link from "next/link";
import { getAllUserProdesFull } from "@/utils/api/prodes";
import { useEffect, useState } from "react";
import ProdeArgGlobalStats from "../components/ProdeArgGlobalStats";
import { BsGlobeAmericas } from "react-icons/bs";

const initialProde: CreateProdeRequestDto[] = [];

export default function Dashboard() {
  const { firebaseUser } = useAuth();
  const [prodes, setProdes] = useState<CreateProdeRequestDto[]>(initialProde);

  useEffect(() => {
    if (!firebaseUser) return;
    getAllUserProdesFull(firebaseUser?.uid)
      .then((res) => {
        console.log(res, " <- prodes");
        setProdes(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [firebaseUser]);

  return (
    <div className="flex flex-col justify-center">
      <Navbar isEnabledCreaElTuyoBtn={!firebaseUser?.isAnonymous} />
      <div></div>
      <div className="px-8 w-full">
        <h1 className="text-left border-b border-teal-500 text-teal-500 font-bold text-2xl mb-4">
          Estadisticas Globales
        </h1>
        <Link
          href={"/home/#globalStats"}
          className="bg-juan w-full font-bold justify-center border-dashed border-juan border-2 p-2 rounded-md inline-flex items-baseline gap-2"
        >
          Mira las Estadisticas Globales
          <BsGlobeAmericas className="" class="spin" />
        </Link>
        <h1 className="text-left border-b border-teal-500 text-teal-500 font-bold text-2xl mb-4">
          Mis Prodes
        </h1>
        <div className="flex flex-col gap-y-3 mb-2">
          {prodes.map((prode, index) => (
            <div
              key={index}
              className="flex gap-x-1 sm:gap-x-2 px-1  py-1 w-full items-baseline justify-between border-b border-teal-500 bg-teal-500 text-white rounded-md min-w-fit"
            >
              <p className="font-bold line-clamp-1 w-full flex-grow border-r pr-1">
                {prode.name}
              </p>

              <p className=" line-clamp-1 text-xs opacity-80 flex-shrink">
                Elecciones Presidenciales 2023
              </p>
              <Link
                href={`/prode/${prode.slug}`}
                className="bg-juan rounded-md px-1 py-1 inline-flex items-center min-w-fit text-sm gap-x-1"
              >
                Detalle<TbExternalLink className="h-5 w-full"></TbExternalLink>
              </Link>
            </div>
          ))}
          {!firebaseUser?.isAnonymous ? (
            <Link
              href="/prode"
              className="inline-flex justify-between items-center text-teal-500 font-bold border-dashed border-2 px-2 py-1 rounded-md border-teal-500 text-xl bg-white text-left"
            >
              <p className="align-baseline">Crear Nuevo Prode</p>{" "}
              <AiFillPlusCircle className="" size={"28px"}></AiFillPlusCircle>
            </Link>
          ) : (
            <Link
              href="/SignWall"
              className="inline-flex justify-between items-center text-slate-900 font-bold border-dashed border-2 px-2 py-1 rounded-md border-slate-900 text-xl bg-red-200 text-left"
            >
              <p className="align-baseline">
                Registrate con Google para poder tener tu propio Prode!
              </p>{" "}
              <AiFillPlusCircle
                className="min-w-fit"
                size={"28px"}
              ></AiFillPlusCircle>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
