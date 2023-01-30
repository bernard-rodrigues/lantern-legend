export interface PossibleKeys{
    KeyA: boolean,
    KeyW: boolean,
    KeyS: boolean,
    KeyD: boolean,

    ArrowUp: boolean,
    ArrowDown: boolean,
    ArrowLeft: boolean,
    ArrowRight: boolean,

    Space: boolean,

    Moving: boolean
}

let keys: PossibleKeys = {
    KeyA: false,
    KeyW: false,
    KeyS: false,
    KeyD: false,

    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,

    Space: false,

    Moving: false
}

export function controlsStartUp(){
    return keys
}

export function controlsKeyDown(event: KeyboardEvent){
    switch(event.code){
        case 'KeyA': keys.KeyA = true; break;
        case 'KeyW': keys.KeyW = true; break;
        case 'KeyS': keys.KeyS = true; break;
        case 'KeyD': keys.KeyD = true; break;

        case 'ArrowUp': keys.ArrowUp = true; break;
        case 'ArrowDown': keys.ArrowDown = true; break;
        case 'ArrowLeft': keys.ArrowLeft = true; break;
        case 'ArrowRight': keys.ArrowRight = true; break;

        case 'Space': keys.Space = true; break;
    }
    keys.Moving = true;
    return keys
}

export function controlsKeyUp(event: KeyboardEvent){
    switch(event.code){
        case 'KeyA': keys.KeyA = false; break;
        case 'KeyW': keys.KeyW = false; break;
        case 'KeyS': keys.KeyS = false; break;
        case 'KeyD': keys.KeyD = false; break;

        case 'ArrowUp': keys.ArrowUp = false; break;
        case 'ArrowDown': keys.ArrowDown = false; break;
        case 'ArrowLeft': keys.ArrowLeft = false; break;
        case 'ArrowRight': keys.ArrowRight = false; break;

        case 'Space': keys.Space = false; break;
    }
    keys.Moving = false;
    return keys
}