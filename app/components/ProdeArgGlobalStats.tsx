import { BsGlobeAmericas } from "react-icons/bs";
import { GrDocumentText } from "react-icons/gr";

export default function CandidateGlobalStatsCard({
  votesAmount,
  prodesAmount,
}: {
  votesAmount: number;
  prodesAmount: number;
}) {
  return (
    <article className="relative rounded-lg border border-gray-100 bg-juan p-6 h-full flex flex-col justify-center">
      <div className="flex items-center justify-between h-fit mb-4">
        <div>
          <p className="text-sm text-gray-500">Estadisticas Globales</p>

          <p className="text-2xl font-medium text-gray-900">
            {votesAmount} Votos
          </p>
        </div>

        <span className="rounded-full bg-teal-100 p-3 text-gray-800 ">
          <BsGlobeAmericas className="text-teal-500 w-12 h-auto aspect-square " />
        </span>
      </div>

      <div className="absolute bottom-6 flex gap-1">
        <GrDocumentText className=" text-gray-500" />

        <p className="flex gap-2 text-xs">
          <span className="text-gray-500">Prodes Creados</span>
          <span className="font-medium">{prodesAmount}</span>
        </p>
      </div>
    </article>
  );
}
