import { useNavigate } from "react-router-dom"

export function Credits(){
    const navigate = useNavigate()
    
    return (
        <div 
            className="border-white border-2 w-1/2 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center py-12"
        >
            <h2 className="text-5xl">Credits</h2>
            
            <h3 className="mt-6 text-4xl">Programmed by</h3>
            <p className="text-2xl">Bernard Rodrigues</p>

            {/* <h3 className="mt-6 text-4xl">Music by</h3>
            <p className="text-2xl">Bernard Rodrigues</p> */}

            <h3 className="mt-6 text-4xl">AI Title Art by</h3>
            <p className="text-2xl">Filipe Cardoso (MidJourney)</p>

            <h3 className="mt-6 text-4xl">Beta Testers</h3>
            <p className="text-2xl">Bruce Rodrigues</p>
            <p className="text-2xl">Filipe Cardoso</p>
            <p className="text-2xl">Leandro Giovanetti</p>
            <p className="text-2xl">Monise Pedrosa</p>
            <p className="text-2xl">Pedro Hote</p>
            <p className="text-2xl">Victor Knop</p>

            <button
                className="mt-5 text-2xl border-white border-2 px-12 py-2 hover:bg-white hover:text-black"
                onClick={() => navigate('/')}
            >
                Voltar
            </button>
        </div>
    )
}