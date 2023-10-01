import { CandidateList } from "@/utils/candidateInfo/candidateList"

type votesType = {
    vote: number,
    candidateId : number
}

type userType = {
    name: string,
    votes : votesType[]
}

const users : userType[] = [
    //all votes in user must add to 100
    {
        name: "Juan re capo",
        votes: [
            {
                vote: 35,
                candidateId: 1
            },
            {
                vote: 20,
                candidateId: 2
            },
            {
                vote:35,
                candidateId: 3
            },
            {
                vote: 5.5,
                candidateId: 4
            },
            {
                vote: 4.5,
                candidateId: 5
            }
        ]
    },
    {
        name: "User 2",
        votes: [
            {
                vote: 50,
                candidateId: 1
            },
            {
                vote: 20,
                candidateId: 2
            },
            {
                vote: 30,
                candidateId: 4
            }
        ]
    },
    {
        name: "User 3",
        votes: [
            {
                vote: 50,
                candidateId: 1
            },
            {
                vote: 50,
                candidateId: 2
            }
        ]
    },
    {
        name: "User 4",
        votes: [
            {
                vote: 50,
                candidateId: 1
            },
            {
                vote: 50,
                candidateId: 2
            }
        ]
    },
    {
        name: "User 5",
        votes: [
            {
                vote: 50,
                candidateId: 1
            },
            {
                vote: 50,
                candidateId: 2
            }
        ]
    },
    {
        name : "User 6",
        votes : [
            {
                vote : 30,
                candidateId : 1
            },
            {
                vote : 20,
                candidateId : 2
            },
            {
                vote : 50,
                candidateId : 3
            }
        ]
    },
    {
        name : "User 7",
        votes : [
            {
                vote : 30,
                candidateId : 1
            },
            {
                vote : 20,
                candidateId : 2
            },
            {
                vote : 50,
                candidateId : 3
            }
        ]
    },
    {
        name : "User 8",
        votes : [
            {
                vote : 30,
                candidateId : 1
            },
            {
                vote : 20,
                candidateId : 2
            },
            {
                vote : 50,
                candidateId : 3
            }
        ]
    },
    {
        name : "Los Pibardos re Facheros",
        votes : [
            {
                vote : 30,
                candidateId : 1
            },
            {
                vote : 20,
                candidateId : 2
            },
            {
                vote : 50,
                candidateId : 3
            }
        ]
    },
    {
        name : "User 10",
        votes : [
            {
                vote : 30,
                candidateId : 1
            },
            {
                vote : 20,
                candidateId : 2
            },
            {
                vote : 50,
                candidateId : 3
            },
        ]
    }
]




export default function TablaVotantes(){

    return (
        <div>
            <h2 className="bg-white flex justify-between rounded-md rounded-b-none w-full text-teal-500 font-bold border-2 border-teal-500 p-1"><p>Estimaciones del grupo</p></h2>
            <div className=" rounded-md rounded-t-none flex-col  bg-gray-100  ">
                
                    {
                        users.map((user,index) => {
                            return (
                                
                                <div className="flex flex-row items-center last-of-type:border-b-0 border-b" key={index}>
                                    <div className="user basis-1/4" >
                                        <div className=" flex justify-normal items-center  h-10 p-2 border-r" >
                                            <p className=" text-xs line-clamp-1 w-full overflow-hidden border-b">{user.name}</p>
                                        </div>
                                    </div>
                                    <div className="singlebar  p-2 items-center justify-center flex flex-row  w-full basis-3/4 " >
                                    {
                                        user.votes.map((vote,index) => {
                                            const votesToWidth = vote.vote.toString() + '%'
                                            const customRadius = index === 0 ? '5px 0 0 5px' : index === user.votes.length - 1 ? '0 5px 5px 0' : '0'
                                            return (
                                                <div className='h-full flex flex-col w-full first ' key={index} style={{width : votesToWidth}}>
                                                        <p className="text-xs text-center overflow-hidden w-fit" style={{color : CandidateList[vote.candidateId-1].theme.color}}>{votesToWidth}</p>
                                                        <div className="singlevote h-2 flex items-center justify-center w-full"  style={{backgroundColor : CandidateList[vote.candidateId-1].theme.color, borderRadius : customRadius}}></div>
                                                </div>
                                                
                                            )
                                        })
                                    }
                                </div>
                                </div>    
                            )
                        })
                        
                    }
                    
                
                
            </div>
        </div>
        
    )
}