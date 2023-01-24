interface MonsterProps{
    position: {
        x: number,
        y: number
    }
    size: number
}

export function Monster(props: MonsterProps){
    return(
        <div 
            className="absolute bg-red-400" 
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