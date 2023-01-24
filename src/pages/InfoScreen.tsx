import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from "phosphor-react";
import { useNavigate } from "react-router-dom";

export function InfoScreen(){
    const navigate = useNavigate()
    
    return(
        <div className="flex flex-col gap-6 justify-center items-center text-3xl p-8 border-2 border-white h-1/2 w-1/2 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <p>Welcome, adventurer!</p>
            <p className="flex items-center gap-3">
                Use
                <ArrowUp size={40} className="border-white border-2 py-1 px-2"/>
                <ArrowDown  size={40} className="border-white border-2 py-1 px-2"/>
                <ArrowLeft  size={40} className="border-white border-2 py-1 px-2"/>
                <ArrowRight  size={40} className="border-white border-2 py-1 px-2"/>
                or
                <span className="border-white border-2 py-1 px-2">A</span>
                <span className="border-white border-2 py-1 px-2">W</span>
                <span className="border-white border-2 py-1 px-2">S</span>
                <span className="border-white border-2 py-1 px-2">D</span>
                to move
            </p>
            <p className="text-center">
                Use the <span className="border-white border-2 py-1 px-2">spacebar</span> to 
                use <u>flashes</u> in critical moments!
            </p>
            <div className="flex mt-6 gap-5">
                <button 
                    className="border-white border-2 px-12 py-2 hover:bg-white hover:text-black"
                    onClick={() => navigate('/start')}    
                >
                    Start!
                </button>
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