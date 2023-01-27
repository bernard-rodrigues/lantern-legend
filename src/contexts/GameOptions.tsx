import { createContext, ReactNode, useContext, useState } from "react";

interface GameOptionsProps{
    difficulty: number,
    lanternColor: number,
    musicVolume: number,
    effectsVolume: number,

    handleResetOptions: () => void,
    toggleDifficulty: () => void,
    toggleLanternColor: () => void,
    handleMusicVolume: (amount: number) => void,
    handleEffectsVolume: (amount: number) => void,

    updateBestScore: (score: number, difficulty: number) => void,

    difficulties: string[],
    lanternColors: string[],
    best: BestScore
}

interface BestScore{
    easy: number,
    normal: number,
    hard: number
}

export const GameOptionsContext = createContext({} as GameOptionsProps)

interface AuthContextProviderProps{
    children: ReactNode
}

const difficulties = ['Easy', 'Normal', 'Hard']
const lanternColors = ['White', 'Yellow', 'Baby Red', 'Baby Blue', 'Baby Green']


export function GameOptionsProvider(props: AuthContextProviderProps){
    const [musicVolume, setMusicVolume] = useState(3);
    const [effectsVolume, setEffectsVolume] = useState(3);
    const [difficulty, setDifficulty] = useState(difficulties.indexOf('Normal'));
    const [lanternColor, setLanternColor] = useState(lanternColors.indexOf('White'));

    const [best, setBest] = useState<BestScore>({easy: 0, normal: 0, hard: 0})
    
    function handleResetOptions(){
        setMusicVolume(3)
        setEffectsVolume(3)
        setDifficulty(difficulties.indexOf('Normal'))
        setLanternColor(lanternColors.indexOf('White'))
    }

    function toggleDifficulty(){
        difficulty < difficulties.length - 1 ? setDifficulty(currentDifficulty => currentDifficulty + 1) : setDifficulty(0)
    }

    function toggleLanternColor(){
        lanternColor < lanternColors.length - 1 ? setLanternColor(currentDifficulty => currentDifficulty + 1) : setLanternColor(0)
    }

    function handleMusicVolume(amount: number){
        setMusicVolume(currentVolume => currentVolume + amount)
    }

    function handleEffectsVolume(amount: number){
        setEffectsVolume(currentVolume => currentVolume + amount)
    }

    function updateBestScore(score: number, difficulty: number){
        if(difficulty == 0 && score > best.easy){
            setBest(oldBestScores => ({...oldBestScores, easy: score}))
        }
        if(difficulty == 1 && score > best.normal){
            setBest(oldBestScores => ({...oldBestScores, normal: score}))
        }
        if(difficulty == 2 && score > best.hard){
            setBest(oldBestScores => ({...oldBestScores, hard: score}))
        }
    }

    return(
        <GameOptionsContext.Provider
            value={
                {
                    difficulty,
                    lanternColor,
                    musicVolume,
                    effectsVolume,

                    handleResetOptions,
                    toggleDifficulty,
                    toggleLanternColor,
                    handleMusicVolume,
                    handleEffectsVolume,

                    updateBestScore,

                    difficulties,
                    lanternColors,
                    best
                }
            }
        >
            {props.children}
        </GameOptionsContext.Provider>
    )
}

export const useOptions = () => {
    return useContext(GameOptionsContext)
}