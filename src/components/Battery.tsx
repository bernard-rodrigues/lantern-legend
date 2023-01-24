interface BatteryProps{
    position: {
        x: number,
        y: number
    },
    size: number
}

export function Battery(props: BatteryProps){
    return(
        <div 
            className="absolute h-4 w-1 z-10 bg-black" 
            style={
                {
                    top:props.position.y, 
                    left: props.position.x,
                    height: props.size/2, 
                    width: props.size/10
                }
            }
        />
    )
}