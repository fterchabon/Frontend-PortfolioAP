export class Educacion {
    id?: number;
    nombreEd: string;
    startEd: string;
    endEd: string;
    descripcionEd: string;

    constructor(nombreEd: string, startEd: string, endEd: string, descripcionEd: string){
        this.nombreEd = nombreEd;
        this.startEd = startEd;
        this.endEd = endEd;
        this.descripcionEd = descripcionEd;

    }
}
