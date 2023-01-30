import { MainTitle } from "../components/MainTitle";
import { OptionButton } from "../components/OptionButton";

export function MainPage(){
    return (
        <>
            <div className="w-full h-2/5  flex flex-col items-center justify-center">
                <MainTitle />
            </div>
            <div className="w-full h-3/5 flex flex-col items-center justify-center bg-titleCover bg-contain bg-no-repeat bg-[bottom_right_5rem]">
                <OptionButton title="Start" navigatesTo="/info"/>
                <OptionButton title="Scoreboard" navigatesTo="/scoreboard" />
                <OptionButton title="Options" navigatesTo="/options"/>
                <OptionButton title="Credits" navigatesTo="/credits"/>
            </div>
        
        </>
    )
}