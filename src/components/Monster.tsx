import monster from '../assets/sprites/monster.png'

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
            className="absolute" 
            style={
                {
                    height: props.size,
                    width: props.size,
                    left: props.position.x,
                    top: props.position.y
                }
            }    
        >
            <img src={monster} alt="" />
        </div>
    )
}