interface volumeBarsProps{
    volume: number
}

export function VolumeBars(props: volumeBarsProps){
    const volumeBlocksToFill = 5 - props.volume

    
    return (
        <div className="flex gap-1">
            {props.volume > 0 && Array.from({length: props.volume}).map((_, i) => (
                <div key={`filled-volume-${i}`} className="h-8 w-4 border border-white bg-white" />
            ))}

            {volumeBlocksToFill > 0 && Array.from({length: volumeBlocksToFill}).map((_, i) => (
                <div key={`empy-volume-${i}`} className="h-8 w-4 border border-white" />
            ))}
        </div>
    )
}