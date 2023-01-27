import { useOptions } from "../contexts/GameOptions"

interface GameBarProps{
    flashes: number,
    charge: number,
    score: number,
    best: number,
    difficulty: number
}

export function GameBar(props: GameBarProps){
    const { difficulties } = useOptions()
    
    return(
        <div className="h-16 bg-white text-black border-b border-black flex items-center justify-around text-3xl">
            <span>Flashes: {props.flashes}</span>
            <div className="w-1/2 h-8 border-black border-2">
                <div className="h-full bg-black" style={{width: `${props.charge}%`}}></div>
            </div>
            <span>Level: {difficulties[props.difficulty]}</span>
            <span>Score: {props.score}</span>
            <span>Best: {props.best}</span>
        </div>
    )
}