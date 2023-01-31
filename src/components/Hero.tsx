import hero from "../assets/hero_idle2.png"
import footArms from "../assets/footArms.png"
import { useOptions } from "../contexts/GameOptions"

interface HeroProps{
    position: {
        x: number,
        y: number
    },
    size: number,
    angle: number,
    charge: number,
    time: number,
    moving: boolean
}


export function Hero(props: HeroProps){
    const {lanternColor} = useOptions()
    
    return(
        <div 
            className="absolute" 
            style={
                {
                    height: props.size,
                    width: props.size,
                    left: props.position.x, 
                    top: props.position.y,
                    rotate: `${props.angle}deg`
                }
            } 
        >
            <img className="-rotate-90" src={hero} alt="Hero" />
            <img 
                src={footArms} 
                alt="LeftArm" 
                className="absolute -z-10 left-0 -translate-y-1/2 -rotate-90"
                style={props.moving ? {top: `${40 + 10*Math.cos(props.time*0.02)}%`} : {top: '50%'}}
            />
            <img 
                src={footArms} 
                alt="RightArm" 
                className="absolute -z-10 right-0 -translate-y-1/2 -rotate-90"
                style={props.moving ? {top: `${40 - 10*Math.cos(props.time*0.02)}%`} : {top: '50%'}}    
            />
            <img 
                src={footArms} 
                alt="LeftFoot" 
                className="absolute -z-10 left-1/4 -translate-y-1/2 -rotate-90"
                style={props.moving ? {top: `${20 - 5*Math.cos(props.time*0.02)}%`} : {top: '15%'}}
            />
            <img 
                src={footArms} 
                alt="RightFoot" 
                className="absolute -z-10 right-1/4 -translate-y-1/2 -rotate-90"
                style={props.moving ? {top: `${20 + 5*Math.cos(props.time*0.02)}%`} : {top: '15%'}}
            />
            <div 
                className="absolute left-1/2 -top-[100vw] -translate-x-1/2 w-0 h-0"
                style={
                    {
                        borderTop: `100vw solid ${
                            lanternColor == 0 ? 'white' : 
                            lanternColor == 1 ? 'yellow' :
                            lanternColor == 2 ? '#ffcccc' :
                            lanternColor == 3 ? '#ccccff' :
                            '#ccffcc'
                        }`,
                        borderLeft: `${(props.charge/100)*30}vw solid transparent`, 
                        borderRight: `${(props.charge/100)*30}vw solid transparent`
                    }
                }
            />
        </div>
    )
}