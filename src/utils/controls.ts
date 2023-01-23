interface PossibleKeys{
    KeyA: boolean,
    KeyW: boolean,
    KeyS: boolean,
    KeyD: boolean
}

let keys: PossibleKeys = {
    KeyA: false,
    KeyW: false,
    KeyS: false,
    KeyD: false
}

export function controls(){
    window.addEventListener('keydown', e => {
        switch(e.code){
            case 'KeyA': keys.KeyA = true; break;
            case 'KeyW': keys.KeyW = true; break;
            case 'KeyS': keys.KeyS = true; break;
            case 'KeyD': keys.KeyD = true; break;
        }
    })

    window.addEventListener('keydown', e => {
        switch(e.code){
            case 'KeyA': keys.KeyA = false; break;
            case 'KeyW': keys.KeyW = false; break;
            case 'KeyS': keys.KeyS = false; break;
            case 'KeyD': keys.KeyD = false; break;
        }
    })

    return keys
}