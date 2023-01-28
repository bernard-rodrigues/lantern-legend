import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from "phosphor-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOptions } from "../contexts/GameOptions";

export function InfoScreen(){
    const navigate = useNavigate()
    
    const { adventurerName, updateAdventurerName } = useOptions()

    const [ temporaryAdventurerName, setTemporaryAdventurerName ] = useState('')

    function start(){
        if(!adventurerName){
            updateAdventurerName(temporaryAdventurerName)
        }
        navigate('/start')
    }

    return(
        <div className="flex flex-col gap-6 justify-center items-center text-3xl p-8 border-2 border-white min-h-1/2 min-w-1/2 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <p>Welcome, adventurer!</p>
            { adventurerName ? 
                <div className="flex items-center gap-3">
                    <p>I'm glad to see you again, {adventurerName}!</p>
                    <button
                        className="border-white border-2 px-2 py-2 hover:bg-white hover:text-black"
                        onClick={() => updateAdventurerName('')}
                    >
                        Change name...
                    </button>
                </div>
                :(
                    <>
                        <p>Please, inform your name:</p>
                        <input 
                            className="text-black px-4"
                            value={temporaryAdventurerName}
                            maxLength={16}
                            onChange={e => setTemporaryAdventurerName(e.target.value)}
                            autoFocus
                        />
                    </>
                )
            }
            <p className="flex items-center gap-3">
                Use
                <ArrowUp size={40} className="border-white border-2 py-1 px-2"/>
                <ArrowDown  size={40} className="border-white border-2 py-1 px-2"/>
                <ArrowLeft  size={40} className="border-white border-2 py-1 px-2"/>
                <ArrowRight  size={40} className="border-white border-2 py-1 px-2"/>
                or
                <span className="border-white border-2 py-1 px-3">A</span>
                <span className="border-white border-2 py-1 px-3">W</span>
                <span className="border-white border-2 py-1 px-3">S</span>
                <span className="border-white border-2 py-1 px-3">D</span>
                to move
            </p>
            <p className="text-center">
                Use the <span className="border-white border-2 py-1 px-2">spacebar</span> to 
                use <u>flashes</u> in critical moments!
            </p>
            <div className="flex mt-6 gap-5">
                {temporaryAdventurerName || adventurerName ? 
                    <button 
                        className="border-white border-2 px-12 py-2 hover:bg-white hover:text-black"
                        onClick={start}
                    >
                        Start!
                    </button>
                    :
                    <></>
                }
                <button
                    className="border-white border-2 px-12 py-2 hover:bg-white hover:text-black"
                    onClick={() => navigate('/')}
                >
                    I'm not ready...
                </button>

            </div>
        </div>
    )
}