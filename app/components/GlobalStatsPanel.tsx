"use client";

import CandidateGlobalStatsCard from "@/app/components/CandidateGlobalStatsCard";
import db from "@/utils/db";
import { collection, getDoc, doc } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { CandidateList } from "@/utils/candidateInfo/candidateList";
import ProdeArgGlobalStats from "@/app/components/ProdeArgGlobalStats";

async function getGlobalStats() {
  const collectionRef = collection(db, "globalStats");
  const docRef = doc(collectionRef, "presidential2023");
  const docSnap = await getDoc(docRef);
  let globalStats = {
    votesAmount: 0,
    prodesAmount: 0,
    stats: {},
  };

  if (docSnap.exists()) {
    const data = docSnap.data();
    for (const [key, value] of Object.entries(data)) {
      if (key === "votesAmount") {
        globalStats.votesAmount = value;
      }
      if (key === "prodesAmount") {
        globalStats.prodesAmount = value;
      }
      if (key === "stats") {
        globalStats.stats = value;
      }
    }
    return globalStats;
  }
}
export default function GlobalStatsPanel() {
  const [globalStats, setGlobalStats] = useState({} as any);
  useEffect(() => {
    getGlobalStats().then((res) => {
      setGlobalStats(res);
    });
  }, []);
  return (
    <section id="globalStats">
      <h1 className="text-3xl font-bold text-center mb-2">
        Estadisticas Globales
      </h1>
      <div className=" justify-center flex w">
        {globalStats.stats != undefined && (
          <>
            <div className="w-11/12  sm:w-fit grid sm:grid-cols-2  grid-cols-1 p-2 gap-2 justify-center">
              <ProdeArgGlobalStats
                prodesAmount={globalStats.prodesAmount}
                votesAmount={globalStats.votesAmount}
              />
              {CandidateList.map((candidate, index) => {
                // Buscando el candidato actual en globalStats.stats
                const candidateVotes =
                  globalStats.stats[candidate.candidateName.split(" ")[1]];

                // Verificando si el candidato fue encontrado en globalStats.stats
                if (candidateVotes !== undefined) {
                  return (
                    <CandidateGlobalStatsCard
                      candidateName={candidate.candidateName}
                      key={index}
                      candidateVotes={candidateVotes}
                      candidateImgUrl={candidate.imageUrl}
                      candidateColor={candidate.theme.color}
                    />
                  );
                }

                // Si el candidato no fue encontrado en globalStats.stats, puedes retornar null o un componente con datos vacíos/placeholder
                return null;
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
