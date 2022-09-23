export class persona{
    id?: number;
    nombre: string;
    apellido: string;
    img: string;
    acercaDe: string;
    email: string;
    titulo: string;

    constructor(
        nombre: string,
        apellido: string,
        img: string,
        acercaDe: string,
        email: string,
        titulo: string){

        this.nombre = nombre;
        this.apellido = apellido;
        this.img = img;
        this.acercaDe = acercaDe;
        this.email = email;
        this.titulo = titulo;

    }
}