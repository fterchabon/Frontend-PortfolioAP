
export class Experiencia {
    id?: number;
    nombreE: string;
    lugarE: string;
    startE: string;
    endE: string;
    descripcionE: string;

    constructor(nombreE: string, lugarE: string, startE: string, endE: string, descripcionE: string){
        this.nombreE = nombreE;
        this.lugarE = lugarE;
        this.startE = startE;
        this.endE = endE;
        this.descripcionE = descripcionE;


    }
}