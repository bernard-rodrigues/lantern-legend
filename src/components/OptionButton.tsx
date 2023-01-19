import { useNavigate } from "react-router-dom"

interface ButtonProps{
    title: string,
    navigatesTo: string
}

export function OptionButton(props: ButtonProps,){
    const navigate = useNavigate()
    
    function handleNavigatesTo(url: string){
        navigate(url)
    }
    
    return(
        <button onClick={() => handleNavigatesTo(props.navigatesTo)} className="w-1/5 border-2 border-white mb-4 p-4 text-2xl hover:text-black hover:bg-white">
            <span className="text-3xl">{props.title}</span>
        </button>
    )
}