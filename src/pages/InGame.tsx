import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Battery } from "../components/Battery";
import { GameBar } from "../components/GameBar"
import { Hero } from "../components/Hero"
import { Monster } from "../components/Monster"
import { useOptions } from "../contexts/GameOptions";
import { controlsKeyUp, controlsKeyDown, PossibleKeys, controlsStartUp } from "../utils/controls";

interface Coordinates{
    x: number,
    y: number
}

export function InGame(){
    const {
        difficulty,
        best,
        updateBestScore
    } = useOptions()

    const [windowSize, setWindowSize] = useState(getWindowSize());
    const SAFETY_MARGIN = 3;
    
    
    const [gameTime, setGameTime] = useState(0)
    
    const [flashes, setFlashes] = useState(5 - difficulty);
    const [score, setScore] = useState(0);
    const [charge, setCharge] = useState(100);
    const [chargeReducingFactor, setChargeReducingFactor] = useState(0.005 * difficulty);
    const [canLevelUp, setCanLevelUp] = useState(false);
    const [backgroundColor, setBackgroundColor] = useState('#000000')
    
    const [heroPosition, setHeroPosition] = useState<Coordinates>({x: 0, y: 0});
    const [heroAngle, setHeroAngle] = useState(0)
    const [monsterCanMove, setMonsterCanMove] = useState(true);
    const [controlling, setControlling] = useState<PossibleKeys>(controlsStartUp);
    const [gameCanva, setGameCanva] = useState(adjustScreen())
    const [monsterPosition, setMonsterPosition] = useState<Coordinates>({x: gameCanva.width - gameCanva.width*0.025, y:gameCanva.height - gameCanva.width*0.025})
    const [heroSize, setHeroSize] = useState(gameCanva.width * 0.025);
    const [batteryPosition, setBatteryPosition] = useState<Coordinates>(updateBatteryPosition());
    
    const HERO_STEP = 1 * gameCanva.width/1920;
    const MONSTER_STEP = 0.25 * gameCanva.width/1920 * (1 + difficulty)

    const navigate = useNavigate()


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
        checkMonsterCollission();
        checkBatteryCollision();
        if(charge <= 0){
            updateBestScore(score, difficulty)
            
            navigate('/gameover', {
                state: {
                    death: 0,
                    score: score
                }
            })
        }
        // setCharge(currentCharge => currentCharge - chargeReducingFactor)
    }

    function updateBatteryPosition(){
        const newPosition = {
            x: Math.random() * (gameCanva.width * 0.8 + heroSize/2),
            y: Math.random() * (gameCanva.height * 0.8 + heroSize/2)
        }
        return newPosition
    }

    function toggleMonsterCanMove(){
        setMonsterCanMove(currentMonsterCanMove => !currentMonsterCanMove);
    }

    function moveCharacter(){
        if(controlling.Space && monsterCanMove && flashes > 0){
            toggleMonsterCanMove();
            const flashEffect = setInterval(() => {
                setTimeout(() => setBackgroundColor('#222222'), Math.random() * 1000);
                setTimeout(() => setBackgroundColor('#000000'), Math.random() * 1000);
            })
            setFlashes(currentFlashes => currentFlashes - 1);
            setTimeout(() => {
                toggleMonsterCanMove();
                clearInterval(flashEffect);
                setTimeout(() => setBackgroundColor('#000000'), 1000);
            }, 1500);
        }else if(
            (controlling.KeyA || controlling.ArrowLeft) && 
            (controlling.KeyW || controlling.ArrowUp) && 
            heroPosition.x > 0 &&
            heroPosition.y > 0
        ){
            setHeroAngle(315)
            setHeroPosition(currentPosition => (
                {...currentPosition, x: currentPosition.x - HERO_STEP/Math.sqrt(2), y: currentPosition.y - HERO_STEP/Math.sqrt(2)}
            ))
        }else if(
            (controlling.KeyD || controlling.ArrowRight) && 
            (controlling.KeyW || controlling.ArrowUp) && 
            heroPosition.x < gameCanva.width * (1 - 0.027) &&
            heroPosition.y > 0
        ){
            setHeroAngle(45)
            setHeroPosition(currentPosition => (
                {...currentPosition, x: currentPosition.x + HERO_STEP/Math.sqrt(2), y: currentPosition.y - HERO_STEP/Math.sqrt(2)}
            ))
        }else if(
            (controlling.KeyD || controlling.ArrowRight) && 
            (controlling.KeyS || controlling.ArrowDown) && 
            heroPosition.x < gameCanva.width * (1 - 0.027) &&
            heroPosition.y < gameCanva.height * (1 - 0.048)
        ){
            setHeroAngle(135)
            setHeroPosition(currentPosition => (
                {...currentPosition, x: currentPosition.x + HERO_STEP/Math.sqrt(2), y: currentPosition.y + HERO_STEP/Math.sqrt(2)}
            ))
        }else if(
            (controlling.KeyA || controlling.ArrowLeft) && 
            (controlling.KeyS || controlling.ArrowDown) && 
            heroPosition.x > 0 &&
            heroPosition.y < gameCanva.height * (1 - 0.048)
        ){
            setHeroAngle(225)
            setHeroPosition(currentPosition => (
                {...currentPosition, x: currentPosition.x - HERO_STEP/Math.sqrt(2), y: currentPosition.y + HERO_STEP/Math.sqrt(2)}
            ))
        }else if((controlling.KeyA || controlling.ArrowLeft) && heroPosition.x > 0){
            setHeroAngle(270)
            setHeroPosition(currentPosition => (
                {...currentPosition, x: currentPosition.x - HERO_STEP}
            ))
        }else if((controlling.KeyD || controlling.ArrowRight) && heroPosition.x < gameCanva.width * (1 - 0.027)){
            setHeroAngle(90)
            setHeroPosition(currentPosition => (
                {...currentPosition, x: currentPosition.x + HERO_STEP}
            ))
        }else if((controlling.KeyW || controlling.ArrowUp) && heroPosition.y > 0){
            setHeroAngle(0)
            setHeroPosition(currentPosition => (
                {...currentPosition, y: currentPosition.y - HERO_STEP}
            ))
        }else if((controlling.KeyS || controlling.ArrowDown) && heroPosition.y < gameCanva.height * (1 - 0.048)){
            setHeroAngle(180)
            setHeroPosition(currentPosition => (
                {...currentPosition, y: currentPosition.y + HERO_STEP}
            ))
        }
    }

    function moveMonster(){
        if(monsterCanMove){

            if(heroPosition.x < monsterPosition.x && heroPosition.y < monsterPosition.y){
                setMonsterPosition(currentPosition => (
                    {...currentPosition, x: currentPosition.x - MONSTER_STEP/Math.sqrt(2), y: currentPosition.y - MONSTER_STEP/Math.sqrt(2)}
                ))
            }else if(heroPosition.x > monsterPosition.x && heroPosition.y > monsterPosition.y){
                setMonsterPosition(currentPosition => (
                    {...currentPosition, x: currentPosition.x + MONSTER_STEP/Math.sqrt(2), y: currentPosition.y + MONSTER_STEP/Math.sqrt(2)}
                ))
            }else if(heroPosition.x < monsterPosition.x && heroPosition.y > monsterPosition.y){
                setMonsterPosition(currentPosition => (
                    {...currentPosition, x: currentPosition.x - MONSTER_STEP/Math.sqrt(2), y: currentPosition.y + MONSTER_STEP/Math.sqrt(2)}
                ))
            }else if(heroPosition.x > monsterPosition.x && heroPosition.y < monsterPosition.y){
                setMonsterPosition(currentPosition => (
                    {...currentPosition, x: currentPosition.x + MONSTER_STEP/Math.sqrt(2), y: currentPosition.y - MONSTER_STEP/Math.sqrt(2)}
                ))
            }else if(heroPosition.x < monsterPosition.x){
                setMonsterPosition(currentPosition => (
                    {...currentPosition, x: currentPosition.x - MONSTER_STEP}
                ))
            }else if(heroPosition.x > monsterPosition.x){
                setMonsterPosition(currentPosition => (
                    {...currentPosition, x: currentPosition.x + MONSTER_STEP}
                ))
            }else if(heroPosition.y < monsterPosition.y){
                setMonsterPosition(currentPosition => (
                    {...currentPosition, y: currentPosition.y - MONSTER_STEP}
                ))
            }else if(heroPosition.y > monsterPosition.y){
                setMonsterPosition(currentPosition => (
                    {...currentPosition, y: currentPosition.y + MONSTER_STEP}
                ))
            }
        }
    }

    function checkMonsterCollission(){
        const heroXCenter = (heroPosition.x + heroSize)/2
        const heroYCenter = (heroPosition.y + heroSize)/2

        const monsterXCenter = (monsterPosition.x + heroSize)/2
        const monsterYCenter = (monsterPosition.y + heroSize)/2

        if(Math.sqrt(Math.pow((Math.abs(heroXCenter-monsterXCenter)), 2) + Math.pow((Math.abs(heroYCenter-monsterYCenter)), 2)) < heroSize/2){
            updateBestScore(score, difficulty)
            
            navigate('/gameover', {
                state: {
                    score: score,
                    death: 1
                }
            })
        }
    }

    function checkBatteryCollision(){
        if(
            batteryPosition.x <= heroPosition.x + heroSize &&
            batteryPosition.y + heroSize/2 >= heroPosition.y &&
            batteryPosition.y <= heroPosition.y + heroSize &&
            batteryPosition.x + heroSize/10 >= heroPosition.x
        ){
            setScore(currentScore => currentScore + 1);
            setCharge(currentCharge => currentCharge + 25 > 100 ? 100 : currentCharge + 25)
            setBatteryPosition(updateBatteryPosition());
            if(score % 10 == 1){
                setCanLevelUp(true)
            }
            if(score % 10 == 0 && canLevelUp){
                setCanLevelUp(false)
                setChargeReducingFactor(currentFactor => currentFactor + 0.005)
            }
        }
    }

    useEffect(() => {
        setInterval(() => {
            setGameTime(currentTime => currentTime + 1)
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
            controlsKeyDown(e) !== controlling ? setControlling(controlsKeyDown(e)) : "";
        }

        function handleControllingKeyUp(e: KeyboardEvent){
            controlsKeyUp(e) !== controlling ? setControlling(controlsKeyUp(e)) : "";
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
            <GameBar 
                flashes={flashes} 
                score={score} 
                difficulty={difficulty}
                best={difficulty == 0 ? best?.easy[0].score! : difficulty == 1 ? best?.normal[0].score! : best?.hard[0].score!} 
                charge={charge} 
            />
            <div className="flex justify-center">
                <div
                    className="border border-white  overflow-hidden relative" 
                    style={{...adjustScreen(), backgroundColor: backgroundColor}}
                >
                    <Battery position={batteryPosition} size={heroSize}/>
                    <Hero 
                        position={heroPosition} 
                        angle={heroAngle} 
                        size={heroSize} 
                        charge={charge}
                        moving={controlling.Moving}
                        time={gameTime}
                    />
                    <Monster position={monsterPosition} size={heroSize} />
                </div>
            </div>
        </div>
    )
}