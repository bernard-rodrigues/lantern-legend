import { Flashlight } from "phosphor-react"

export function MainTitle(){
    return(
        <div className="w-full flex items-center justify-center gap-16">
            <Flashlight size={64} className="hover:animate-spin" />
            <h1 className="font-VT text-9xl">Lantern Legend</h1>
            <Flashlight size={64} className="hover:animate-spin" />
        </div>
    )
}