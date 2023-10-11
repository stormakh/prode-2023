"use client";

export default function Faq() {
  return (
    <div className="space-y-4">
      <h2 className="ml-5 text-left text-3xl font-bold sm:text-4xl">
        Preguntas frecuentes
      </h2>
      <details
        className="group rounded-lg bg-gray-50 p-6 [&_summary::-webkit-details-marker]:hidden"
        open
      >
        <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900">
          <h2 className="font-medium">Como se que hacen con mis datos?</h2>

          <span className="relative h-5 w-5 shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute inset-0 h-5 w-5 opacity-100 group-open:opacity-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute inset-0 h-5 w-5 opacity-0 group-open:opacity-100"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </span>
        </summary>

        <p className="mt-4 leading-relaxed text-gray-700">
          ProdeArg es un proyecto 100% OpenSource sin fines de lucro que
          inicialmente busca optimizar la experiencia de las personas para
          compartir sus predicciones politicas.
        </p>
      </details>

      <details className="group rounded-lg bg-gray-50 p-6 [&_summary::-webkit-details-marker]:hidden">
        <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900">
          <h2 className="font-medium">
            Como evitan la manipulacion de los resultados a traves de ejercitos
            de Bots?
          </h2>

          <span className="relative h-5 w-5 shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute inset-0 opacity-100 group-open:opacity-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute inset-0 opacity-0 group-open:opacity-100"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </span>
        </summary>

        <p className="mt-4 leading-relaxed text-gray-700">
          Para empezar, la primer medida que tomamos es limitar la creacion de
          prodes a quienes tengan una cuenta de Gmail. Esto ya reduce la
          cantidad de prodes que se pueden realizar, ya que Google ya de por si
          realiza un trabajo de reduccion de bots. Ademas realizamos un analisis
          de los resultados globales, donde eliminamos aquellos que se escapan
          de la distribucion normal.
        </p>
      </details>
    </div>
  );
}
