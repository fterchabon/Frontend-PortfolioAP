export class Skill {
    id?: number;
    nombreS: string;
    imgS: string;
    porcentajeS: number;
    softS: string;


    constructor(nombreS: string, imgS: string, porcentajeS:number, softS: string){
        this.nombreS = nombreS;
        this.imgS = imgS;
        this.porcentajeS = porcentajeS;
        this.softS = softS;

    }
}
