import { onValue, ref, set } from "firebase/database";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { database } from "../utils/database";

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
    updateAdventurerName: (name: string) => void,

    adventurerName: string,
    difficulties: string[],
    lanternColors: string[],
    best?: BestScore
}

export interface OnlineScore{
    name: string,
    score: number
}

interface BestScore{
    easy: OnlineScore[],
    normal: OnlineScore[],
    hard: OnlineScore[]
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
    const [adventurerName, setAdventurerName] = useState('')

    const [best, setBest] = useState<BestScore>()
    
    useEffect(() => {
        const scoreRef = ref(database, '/');
        onValue(scoreRef, (snapshot) => {
            const data = snapshot.val();
            setBest(data)
})
    }, [])
    
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

    function updateAdventurerName(name: string){
        setAdventurerName(name)
    }

    function updateBestScore(score: number, difficulty: number){
        let newRecordFlag = false
        if(difficulty == 0){
            best?.easy.forEach(register => {
                if(score > register.score){
                    newRecordFlag = true;
                }
            })
            if(newRecordFlag){
                best?.easy.pop()
                best?.easy.push({
                    name: adventurerName,
                    score: score
                })
                set(ref(database, 'easy'), best?.easy);
            }
        }

        if(difficulty == 1){
            best?.normal.forEach(register => {
                if(score > register.score){
                    newRecordFlag = true;
                }
            })
            if(newRecordFlag){
                best?.normal.pop()
                best?.normal.push({
                    name: adventurerName,
                    score: score
                })
                set(ref(database, 'normal'), best?.normal);
            }
        }

        if(difficulty == 2){
            best?.hard.forEach(register => {
                if(score > register.score){
                    newRecordFlag = true;
                }
            })
            if(newRecordFlag){
                best?.hard.pop()
                best?.hard.push({
                    name: adventurerName,
                    score: score
                })
                set(ref(database, 'hard'), best?.hard);
            }
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
                    updateAdventurerName,

                    adventurerName,
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