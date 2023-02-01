import battery from '../assets/sprites/battery.png'

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
            className="absolute z-10" 
            style={
                {
                    top:props.position.y, 
                    left: props.position.x,
                    height: props.size, 
                    width: props.size/5
                }
            }
        >
            <img src={battery} alt="Battery" />
        </div>
    )
}