import { IVote } from "@/models/vote"
import { CandidateList } from "@/utils/candidateInfo/candidateList"

type votesType = {
  vote: number
  candidateId: number
}

type userType = {
  name: string
  votes: votesType[]
}



export default function TablaVotantes({ votesList }: { votesList: IVote[] }) {
  const votes = votesList.map((vote, index) => {
    type CandidateVotes = {
      [key: string]: number
    }

    const userVote = CandidateList.map((candidate) => {
      const localUserVotes: CandidateVotes = vote.votes || {}

      return {
        vote: localUserVotes[candidate.candidateIdentifier] || 0,
        candidateId: candidate.id,
      }
    })

    return {
      name: vote.voterUid + index,
      votes: userVote,
    }
  })
  return (
    <div>
      <h2 className="bg-white flex justify-between rounded-md rounded-b-none w-full text-teal-500 font-bold border-2 border-teal-500 p-1">
        <p>Estimaciones del grupo</p>
      </h2>
      <div className=" rounded-md rounded-t-none flex-col  bg-gray-100  ">
        {votes.map((user, index) => {
          return (
            <div
              className="flex flex-row items-center last-of-type:border-b-0 border-b"
              key={index}
            >
              <div className="user basis-1/4">
                <div className=" flex justify-normal items-center  h-10 p-2 border-r">
                  <p className=" text-xs line-clamp-1 w-full overflow-hidden border-b">
                    {user.name}
                  </p>
                </div>
              </div>
              <div className="singlebar  p-2 items-center justify-center flex flex-row  w-full basis-3/4 ">
                {user.votes.map((vote, index) => {
                  const votesToWidth = vote.vote.toFixed(1) + "%"
                  const customRadius =
                    index === 0
                      ? "5px 0 0 5px"
                      : index === user.votes.length - 1
                      ? "0 5px 5px 0"
                      : "0"
                  return (
                    <div
                      className="h-full flex flex-col w-full first "
                      key={index}
                      style={{ width: votesToWidth }}
                    >
                      <p
                        className="text-xs text-center overflow-hidden w-fit"
                        style={{
                          color:
                            CandidateList[vote.candidateId - 1].theme.color,
                        }}
                      >
                        {votesToWidth}
                      </p>
                      <div
                        className="singlevote h-2 flex items-center justify-center w-full"
                        style={{
                          backgroundColor:
                            CandidateList[vote.candidateId - 1].theme.color,
                          borderRadius: customRadius,
                        }}
                      ></div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
