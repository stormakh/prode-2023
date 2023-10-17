import { StaticImageData } from "next/image";
import Image from "next/image";
export default function CandidateGlobalStatsCard({
  candidateName,
  candidateVotes,
  candidateImgUrl,
  candidateColor,
}: {
  candidateName: string;
  candidateVotes: number;
  candidateImgUrl: StaticImageData;
  candidateColor: string;
}) {
  return (
    <article className="rounded-lg border border-gray-100 bg-white p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">Votos Esperados</p>

          <p className="text-2xl font-medium text-gray-900">
            {candidateVotes.toFixed(2)}%
          </p>
        </div>

        <span
          className="rounded-full  p-2"
          style={{ backgroundColor: "transparent" }}
        >
          <Image
            src={candidateImgUrl}
            alt="Picture of the author"
            className=" w-28 aspect-square "
          />
        </span>
      </div>

      <div className="mt-1 flex gap-1" style={{ color: candidateColor }}>
        <p className="flex gap-2 text-xs">
          <span className="text-gray-500"> {candidateName} </span>
        </p>
      </div>
    </article>
  );
}
