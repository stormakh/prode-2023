import Profile_Pic_Cami from "@/public//profile_pic_cami.webp";
import Profile_Pic_Agus from "@/public/profile_pic_agus.webp";
import Profile_Pic_Nico from "@/public/profile_pic_nico.jpg";
import Profile_Pic_Santi from "@/public//profile_pic_santi.jpg";
import Image, { StaticImageData } from "next/image";
const people = [
  {
    name: "Santiago Tormakh",
    role: "DEV",
    equipo: {
      name: "Platense",
      color: "rgba(237, 144, 9, 0.5)",
    },
    imgUrl: Profile_Pic_Santi,
    descripcion:
      "Licenciatura en Sistemas en UADE, fan Numero 1 de Tailwind desde 2023",
  },
  {
    name: "Agustin Tormakh",
    role: "DEV",
    equipo: {
      name: "Boca Juniors",
      color: "rgba(59, 130, 246, 0.5)",
    },
    imgUrl: Profile_Pic_Agus,
    descripcion:
      "Ingeniería Informática en el ITBA, apasionado por el mundo crypto desde 2016.",
  },
  {
    name: "Nicolas Castagnini",
    role: "Designer",
    equipo: {
      name: "Platense",
      color: "rgba(237, 144, 9, 0.5)",
    },
    imgUrl: Profile_Pic_Nico,
    descripcion:
      "Diseñador industrial en la universidad de palermo, experimentando como diseñador de ui/ux.",
  },
  {
    name: "Camila Borinsky",
    role: "DEV",
    equipo: {
      name: "River Plate",
      color: "rgba(248, 113, 113, 0.5)",
    },
    imgUrl: Profile_Pic_Cami,
    descripcion:
      "Ingeniería Informática en el ITBA, con años de experiencia como software developer.",
  },
];

function Individuales({
  name,
  role,
  equipo,
  imgUrl,
  descripcion,
}: {
  name: string;
  role: string;
  equipo: {
    name: string;
    color: string;
  };
  imgUrl: StaticImageData;
  descripcion: string;
}) {
  return (
    <article className="relative hover:animate-background rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-0.5 shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s]">
      <div className="w-full h-fit absolute top-4 inset-x-0 flex items-center justify-center">
        <Image
          alt={""}
          src={imgUrl}
          className="rounded-full w-24 h-auto aspect-square "
        ></Image>
      </div>

      <div className="rounded-[10px] bg-white p-4 !pt-32 sm:p-6  min-h-full">
        <time dateTime="2022-10-10" className="block text-xs text-gray-500">
          10th Oct 2022
        </time>

        <a href="#">
          <h3 className="mt-0.5 text-lg font-medium text-gray-900">
            {descripcion}
          </h3>
        </a>

        <div className="mt-4 flex flex-wrap gap-1">
          <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600">
            {role}
          </span>

          <span
            className={`whitespace-nowrap rounded-full  px-2.5 py-0.5 text-xs text-black`}
            style={{ backgroundColor: equipo.color }}
          >
            {equipo.name}
          </span>
        </div>
      </div>
    </article>
  );
}

export default function QuienesSomos() {
  return (
    <>
      <h2 className="ml-5 text-left text-3xl font-bold sm:text-4xl">
        Quienes Somos
      </h2>
      <div
        id="Team"
        className="grid grid-cols-1 gap-4 p-4 lg:grid-cols-3 sm:grid-cols-2"
      >
        {people.map((person, index) => (
          <Individuales
            key={index}
            name={person.name}
            role={person.role}
            equipo={person.equipo}
            imgUrl={person.imgUrl}
            descripcion={person.descripcion}
          />
        ))}
      </div>
    </>
  );
}
