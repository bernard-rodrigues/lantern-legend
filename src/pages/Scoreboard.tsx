import { useNavigate } from "react-router-dom"
import { OnlineScore, useOptions } from "../contexts/GameOptions"

export function Scoreboard(){
    const navigate = useNavigate()

    const { best } = useOptions()

    const objectComparisonCallback = (arrayItemA: OnlineScore, arrayItemB: OnlineScore) => {
        if(arrayItemA.score > arrayItemB.score){
            return -1
        }
        if(arrayItemA.score < arrayItemB.score){
            return 1
        }
        return 0
    }
    
    return (
        <div className="absolute border-2 border-white w-4/5 h-4/5 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center gap-16">
            <div className="flex justify-around w-full">
                <div>
                    <h2 className="text-5xl text-center mb-4">Easy</h2>
                    <ul>
                        {best?.easy.sort(objectComparisonCallback).map((score, index) => (
                            <li key={`score.name-${index}`} className="text-3xl">{score.score}pts {score.name}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h2 className="text-5xl text-center mb-4">Normal</h2>
                    <ul>
                        {best?.normal.sort(objectComparisonCallback).map((score, index) => (
                            <li key={`score.name-${index}`} className="text-3xl">{score.score}pts {score.name}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h2 className="text-5xl text-center mb-4">Hard</h2>
                    <ul>
                        {best?.hard.sort(objectComparisonCallback).map((score, index) => (
                            <li key={`score.name-${index}`} className="text-3xl">{score.score}pts {score.name}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <button
                className="mt-5 text-2xl border-white border-2 px-12 py-2 hover:bg-white hover:text-black"
                onClick={() => navigate('/')}
            >
                Voltar
            </button>
        </div>

    )
}