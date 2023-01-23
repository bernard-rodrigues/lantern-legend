interface HeroProps{
    position: {
        x: number,
        y: number
    }
}

export function Hero(props: HeroProps){
    return(
        <div className="absolute h-12 w-12 bg-blue-400" style={{left: props.position.x, top: props.position.y}} />
    )
}