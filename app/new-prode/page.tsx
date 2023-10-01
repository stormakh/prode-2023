
import NavbarVacia from "../components/NavbarVacia";





export default function NewProde(){

    const error = true; //esto es solo para usar de ejemplo en el texto de error

    return(
        <>
            <NavbarVacia/>
            <div className="p-2 flex flex-col gap-y-3">
                <div className="w-full border-b border-teal-500">
                    <h1 className="font-bold text-3xl text-teal-500">Nombre Prode</h1>
                </div>
                <div>
                    <input type="text" placeholder="Tu Prode..." className="w-full border border-teal-500 rounded-md p-1 text-juan placeholder:text-teal-500"></input>
                    {
                        error ? <p className=" line-clamp-2 text-red-500 text-sm">El nombre no puede contener:espacios,puntos,ni signos de pregunta</p> : null
                    }
                </div>
                <div className="flex flex-row gap-x-1 items-baseline">
                    <h2 className="text-teal-500 text-md">Esta disponible el nombre: </h2>
                    <p className="max-w-fit text-black text-lg underline">{'nombre disponible'}</p>
                </div>
            </div>
        </>
        

    )
}