interface HeroProps{
    position: {
        x: number,
        y: number
    },
    size: number
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
                    top: props.position.y
                }
            } 
        />
    )
}