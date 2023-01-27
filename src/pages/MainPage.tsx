import { MainTitle } from "../components/MainTitle";
import { OptionButton } from "../components/OptionButton";

export function MainPage(){
    return (
        <>
            <div className="w-full h-1/2  flex flex-col items-center justify-center">
                <MainTitle />
            </div>
            <div className="w-full h-1/2 flex flex-col items-center justify-center">
                <OptionButton title="Start" navigatesTo="/info"/>
                <OptionButton title="Options" navigatesTo="/options"/>
                <OptionButton title="Credits" navigatesTo="/credits"/>
            </div>
        
        </>
    )
}