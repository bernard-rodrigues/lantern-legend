import { useEffect, useState } from "react"
import { GameBar } from "../components/GameBar"
import { Hero } from "../components/Hero"
import { Monster } from "../components/Monster"
import { controlsKeyUp, controlsKeyDown, PossibleKeys, controlsStartUp } from "../utils/controls";

export function InGame(){
    const [windowSize, setWindowSize] = useState(getWindowSize());
    const SAFETY_MARGIN = 3;
    const HERO_STEP = 1;
    const MONSTER_STEP = 0.5
    
    const [flashes, setFlashes] = useState(0);
    const [score, setScore] = useState(0);
    const [best, setBest] = useState(0);
    const [charge, setCharge] = useState(100);
    const [gameTime, setGameTime] = useState(0)

    const [heroPosition, setHeroPosition] = useState({x: 0, y: 0});
    const [moving, setMoving] = useState(false);
    const [controlling, setControlling] = useState<PossibleKeys>(controlsStartUp);
    const [gameCanva, setGameCanva] = useState(adjustScreen())
    const [monsterPosition, setMonsterPosition] = useState({x: gameCanva.width - gameCanva.width*0.025, y:gameCanva.height - gameCanva.width*0.025})


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

    function frameUpdate(){
        moveCharacter();
        // moveMonster();
    }

    function moveCharacter(){
        if((controlling.KeyA || controlling.ArrowLeft) && heroPosition.x > 0){
            setHeroPosition(currentPosition => (
                {...currentPosition, x: currentPosition.x - HERO_STEP}
            ))
        }
        if((controlling.KeyD || controlling.ArrowRight) && heroPosition.x < gameCanva.width * (1 - 0.027)){
            setHeroPosition(currentPosition => (
                {...currentPosition, x: currentPosition.x + HERO_STEP}
            ))
        }

        if((controlling.KeyW || controlling.ArrowUp) && heroPosition.y > 0){
            setHeroPosition(currentPosition => (
                {...currentPosition, y: currentPosition.y - HERO_STEP}
            ))
        }

        if((controlling.KeyS || controlling.ArrowDown) && heroPosition.y < gameCanva.height * (1 - 0.048)){
            setHeroPosition(currentPosition => (
                {...currentPosition, y: currentPosition.y + HERO_STEP}
            ))
        }
    }

    function moveMonster(){
        if(heroPosition.x < monsterPosition.x){
            setMonsterPosition(currentPosition => (
                {...currentPosition, x: currentPosition.x - MONSTER_STEP}
            ))
        }

        if(heroPosition.x > monsterPosition.x){
            setMonsterPosition(currentPosition => (
                {...currentPosition, x: currentPosition.x + MONSTER_STEP}
            ))
        }

        if(heroPosition.y < monsterPosition.y){
            setMonsterPosition(currentPosition => (
                {...currentPosition, y: currentPosition.y - MONSTER_STEP}
            ))
        }

        if(heroPosition.y > monsterPosition.y){
            setMonsterPosition(currentPosition => (
                {...currentPosition, y: currentPosition.y + MONSTER_STEP}
            ))
        }
    }

    useEffect(() => {
        setInterval(() => {
            setGameTime(currentTime => currentTime == 0 ? 1 : 0)
        }, 1)
    }, [])

    useEffect(() => {
        frameUpdate();
    }, [gameTime])

    useEffect(() => {
        function handleWindowResize(){
            setWindowSize(getWindowSize());
        }

        function handleControllingKeyDown(e: KeyboardEvent){
            setMoving(true);
            setControlling(controlsKeyDown(e));
        }

        function handleControllingKeyUp(e: KeyboardEvent){
            setMoving(false);
            setControlling(controlsKeyUp(e));
        }

        window.addEventListener('resize', handleWindowResize);
        window.addEventListener('keydown', e => handleControllingKeyDown(e))
        window.addEventListener('keyup', e => handleControllingKeyUp(e))
        
        return () => {
            window.removeEventListener('resize', handleWindowResize);
            window.removeEventListener('keydown', e => handleControllingKeyDown(e));
            window.removeEventListener('keyup', e => handleControllingKeyUp(e));
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
                <div
                    className="bg-black border border-white relative" 
                    style={adjustScreen()}
                >
                    <Hero position={heroPosition} size={gameCanva.width*0.025} />
                    <Monster position={monsterPosition} size={gameCanva.width*0.025} />
                </div>
            </div>
        </div>
    )
}