import { useNavigate, useLocation } from "react-router-dom"
import { useOptions } from "../contexts/GameOptions";



export function GameOver(){
    const navigate = useNavigate();
    const location = useLocation();

    const { difficulties, difficulty } = useOptions()
    
    const deaths = ["Hello, darkness... You ran out of battery", "Oh, the pain... The monster got you"]
    
    return(
        <div className="flex flex-col gap-5 justify-center items-center text-3xl p-8 border-2 border-white h-1/2 w-1/2 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <p>{deaths[location.state.death]}</p>
            <p className="text-5xl">Game Over</p>
            <p>Difficulty: {difficulties[difficulty]}</p>
            <p>Your score: {location.state.score}</p>
            <div className="flex gap-5 mt-6">
                <button 
                    className="border-white border-2 px-12 py-2 hover:bg-white hover:text-black"
                    onClick={() => navigate('/start')}    
                >
                    Try again!
                </button>
                <button
                    className="border-white border-2 px-12 py-2 hover:bg-white hover:text-black"
                    onClick={() => navigate('/')}
                >
                    Run like a chicken...
                </button>

            </div>
        </div>
    )
}