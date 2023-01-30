import { useNavigate } from "react-router-dom"
import { VolumeBars } from "../components/VolumeBars"
import { ArrowLeft, ArrowRight } from 'phosphor-react'
import { useOptions } from "../contexts/GameOptions"

export function OptionPage(){
    const navigate = useNavigate()

    function handleExit(){
        navigate('/');
    }

    const {
        lanternColors,
        lanternColor,
        toggleLanternColor,
        musicVolume,
        handleMusicVolume,
        effectsVolume,
        handleEffectsVolume,
        handleResetOptions
    } = useOptions()

    return(
        <div className="flex flex-col justify-around text-3xl p-8 border-2 border-white h-1/2 w-1/2 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="flex justify-between">
                <span>Lantern Color</span>
                <div className="flex gap-2 items-center">
                    <span style={{
                        color: `${
                            lanternColor == 0 ? 'white' : 
                            lanternColor == 1 ? 'yellow' :
                            lanternColor == 2 ? '#ffcccc' :
                            lanternColor == 3 ? '#ccccff' :
                            '#ccffcc'
                        }`,
                    }}>{lanternColors[lanternColor]}</span>
                    
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