import { useEffect, useState } from "react";
import { CandidateList } from "@/utils/candidateInfo/candidateList";
import { CandidateType } from "@/models/candidate";
import Navbar from "../../components/Navbar";
import CandidateAverage from "../../components/CandidateAverage";
import TablaVotantes from "../../components/TablaVotantes";
import { GetFullProdeResponseDto, GetProdeResponseDto } from "@/models/prode";
import { getFullProde } from "@/utils/api/prodes";
import Link from "next/link";
import { CgLink } from "react-icons/cg";
import { FaRegCopy } from "react-icons/fa";
import { ProdeSteps } from "@/app/components/ProdeSteps";

export type CandidateStatsType = CandidateType & { vote?: number };
export default function ProdeStats({
  params,
}: {
  params: { prode?: GetProdeResponseDto; slug: string; firebaseUser: any };
}) {
  const [candidateStats, setCandidateStats] =
    useState<CandidateStatsType[]>(CandidateList);
  const [fullProde, setFullProde] = useState<
    GetFullProdeResponseDto | undefined
  >(undefined);

  function handleCopyShareLink(link: string) {
    try {
      navigator.clipboard.writeText(link);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    const localCandidateStats: CandidateStatsType[] = [];
    CandidateList.forEach((candidate) => {
      const vote = params.prode?.stats[candidate.candidateIdentifier];
      const candidateWithVote = { ...candidate, vote: vote };
      localCandidateStats.push(candidateWithVote);
    });
    setCandidateStats(localCandidateStats);
    const getFullProdeAsync = async () => {
      const fullProdeLocal = await getFullProde(params.slug);
      console.log("FULL PRODE:", fullProdeLocal);
      setFullProde(fullProdeLocal);
    };
    getFullProdeAsync();
  }, [params.prode, params.slug]);

  return (
    <>
      <Navbar isEnabledCreaElTuyoBtn={true} />
      <div className="p-4">
        {params.prode?.owner === params.firebaseUser?.uid ? (
          <div className="ml-2 mr-2 mb-5">
            <ProdeSteps step={3} />
          </div>
        ) : (
          <></>
        )}
        <div className="inline-flex border-b-1/2 w-full justify-between items-end">
          <h1 className="text-3xl font-bold">Promedio</h1>
          <h2 className="text-lg text-right opacity-25 line-clamp-1">
            {params.prode?.name}
          </h2>
        </div>
        <div className="flex flex-col mt-4 gap-y-4 justify-between">
          {candidateStats.map((candidate, index) => {
            return <CandidateAverage candidate={candidate} key={index} />;
          })}
        </div>
      </div>
      <div className="flex flex-col justify-center w-full p-4 gap-y-10">
        <TablaVotantes votesList={fullProde?.votes || []} />
        <Link
          href={"/prode"}
          className="bg-teal-500 text-white font-bold p-2 rounded-md text-2xl text-center"
        >
          Crea el tuyo
        </Link>
        <div className="flex flex-col justify-center items-center gap-y-2">
          <h2 className="w-4/5 text-2xl text-center font-bold border-b border-teal-500 text-teal-500">
            Compartilo
          </h2>
          <div className="w-full inline-flex justify-center items-center h-10 max-h-fit">
            <div className="inline-flex items-center w-4/5 h-10 border-dashed border-r-0 border-teal-500 border-2 rounded-md rounded-r-none border-opacity-70">
              <CgLink className="text-lg text-teal-500 w-1/6 h-2/3 max-w-fit" />
              <p className="line-clamp-1">{`https://www.prodearg.com/prode/${params.slug}`}</p>
            </div>
            <button
              onClick={(e) =>
                handleCopyShareLink(
                  `https://www.prodearg.com/prode/${params.slug}`
                )
              }
              className="text-lg text-white bg-teal-500 rounded-md w-1/5 h-10 max-w-fit rounded-l-none p-3 hover:text-teal-500 hover:bg-juan hover:border"
            >
              <FaRegCopy className="" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
