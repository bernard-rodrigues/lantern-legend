import { useEffect, useState } from "react"
import { GameBar } from "../components/GameBar"
import { Hero } from "../components/Hero"
import { Monster } from "../components/Monster"
import { controls } from "../utils/controls";

export function InGame(){
    const [windowSize, setWindowSize] = useState(getWindowSize());
    const SAFETY_MARGIN = 3;
    const HERO_STEP = 1;
    
    const [flashes, setFlashes] = useState(0);
    const [score, setScore] = useState(0);
    const [best, setBest] = useState(0);
    const [charge, setCharge] = useState(100);

    const [heroPosition, setHeroPosition] = useState({x: 0, y: 0});
    const [controlling, setControlling] = useState(
        {
            KeyA: false,
            KeyW: false,
            KeyS: false,
            KeyD: false
        }
    );


    function adjustScreen(){
        if(windowSize.innerWidth/(windowSize.innerHeight - 64) == 16/9){
            return {
                width: windowSize.innerWidth - SAFETY_MARGIN, 
                height: windowSize.innerHeight - 64 - SAFETY_MARGIN
            }
        }else if(windowSize.innerWidth/(windowSize.innerHeight-64) < 16/9){
            return {
                width: windowSize.innerWidth - SAFETY_MARGIN, 
                height: (windowSize.innerWidth*9)/16 - SAFETY_MARGIN
            }
        }else{
            return {
                width: ((windowSize.innerHeight - 64)*16)/9-SAFETY_MARGIN, 
                height: windowSize.innerHeight - 64 - SAFETY_MARGIN
            }
        }
    }

    function moveCharacter(){
        if(controlling.KeyA){
            setHeroPosition(currentPosition => (
                {...currentPosition, x: currentPosition.x - 1}
            ))
        }

        if(controlling.KeyD){
            setHeroPosition(currentPosition => (
                {...currentPosition, x: currentPosition.x + 1}
            ))
        }

        if(controlling.KeyW){
            setHeroPosition(currentPosition => (
                {...currentPosition, y: currentPosition.y - 1}
            ))
        }

        if(controlling.KeyS){
            setHeroPosition(currentPosition => (
                {...currentPosition, y: currentPosition.y + 1}
            ))
        }
    }

    useEffect(() => {
        function handleWindowResize(){
            setWindowSize(getWindowSize());
        }

        function handleControlling(){
            setControlling(controls());
        }

        setInterval(moveCharacter, 1);

        window.addEventListener('resize', handleWindowResize);
        window.addEventListener('keydown', controls)
        window.addEventListener('keyup', controls)
        
        return () => {
            window.removeEventListener('resize', handleWindowResize);
            window.removeEventListener('keydown', handleControlling);
            window.removeEventListener('keyup', handleControlling);
        };
    }, [])
    
    function getWindowSize(){
        const {innerWidth, innerHeight} = window;
        return {innerWidth, innerHeight};
    }
    
    return(
        <div className="w-screen h-screen">
            <GameBar flashes={flashes} score={score} best={best} charge={charge} />
            <div className="flex justify-center">
                <div className="bg-black border border-white relative" style={adjustScreen()}>
                    <Hero position={heroPosition}/>
                    <Monster />
                </div>
            </div>
        </div>
    )
}