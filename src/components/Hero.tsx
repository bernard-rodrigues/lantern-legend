interface HeroProps{
    position: {
        x: number,
        y: number
    },
    size: number,
    angle: number,
    charge: number
}

export function Hero(props: HeroProps){
    return(
        <div 
            className="absolute bg-blue-400" 
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
            <div 
                className="absolute left-1/2 -top-[100vw] -translate-x-1/2 w-0 h-0 border-x-transparent border-t-[100vw] border-t-white"
                style={{borderLeft: `${(props.charge/100)*30}vw solid transparent`, borderRight: `${(props.charge/100)*30}vw solid transparent`}}    
            />
        </div>
    )
}