import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { VolumeBars } from "../components/VolumeBars"
import { ArrowLeft, ArrowRight } from 'phosphor-react'

const difficulties = ['Easy', 'Normal', 'Hard']
const lanternColors = ['White', 'Yellow', 'Baby Red', 'Baby Blue', 'Baby Green']

export function OptionPage(){
    const [musicVolume, setMusicVolume] = useState(3);
    const [effectsVolume, setEffectsVolume] = useState(3);
    const [difficulty, setDifficulty] = useState(difficulties.indexOf('Normal'));
    const [lanternColor, setLanternColor] = useState(lanternColors.indexOf('White'));

    const navigate = useNavigate()
    
    function handleResetOptions(){
        setMusicVolume(3)
        setEffectsVolume(3)
        setDifficulty(difficulties.indexOf('Normal'))
        setLanternColor(lanternColors.indexOf('White'))
    }

    function handleExit(){
        navigate('/');
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

    return(
        <div className="flex flex-col justify-around text-3xl p-8 border-2 border-white h-1/2 w-1/2 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="flex justify-between">
                <span>Difficulty</span>
                <div className="flex gap-2 items-center">
                    <span>{difficulties[difficulty]}</span>
                    
                    <button onClick={toggleDifficulty}>
                        <ArrowRight />
                    </button>
                </div>
            </div>

            <div className="flex justify-between">
                <span>Lantern Color</span>
                <div className="flex gap-2 items-center">
                    <span>{lanternColors[lanternColor]}</span>
                    
                    <button onClick={toggleLanternColor}>
                        <ArrowRight />
                    </button>
                </div>
            </div>

            <div className="flex justify-between">
                <span>Music</span>
                <div className="flex gap-2 items-center">
                    <button onClick={musicVolume > 0 ? () => handleMusicVolume(-1) : () => handleMusicVolume(0)}>
                        <ArrowLeft />
                    </button>
                    
                    <VolumeBars volume={musicVolume}/>
                    
                    <button onClick={musicVolume < 5 ? () => handleMusicVolume(1) : () => handleMusicVolume(0)}>
                        <ArrowRight />
                    </button>
                </div>
            </div>

            <div className="flex justify-between">
                <span>VFX</span>
                <div className="flex gap-2 items-center">
                    <button onClick={effectsVolume > 0 ? () => handleEffectsVolume(-1) : () => handleEffectsVolume(0)}>
                        <ArrowLeft />
                    </button>
                    
                    <VolumeBars volume={effectsVolume}/>
                    
                    <button onClick={effectsVolume < 5 ? () => handleEffectsVolume(1) : () => handleEffectsVolume(0)}>
                        <ArrowRight />
                    </button>
                </div>
            </div>



            <div>
                <button onClick={handleResetOptions}>Reset Options</button>
            </div>

            <div className="flex justify-center">
                <button onClick={handleExit}>Exit</button>
            </div>
        </div>
    )
}