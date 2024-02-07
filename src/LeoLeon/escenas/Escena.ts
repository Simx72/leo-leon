import { Juego } from "../Juego";

/**
 * Escena del juego
 */
export class Escena {
    constructor(juego: Juego) {
        this.juego = juego;
    }
    juego: Juego;
    cargar() {};
    iniciar() {};
    actualizar() {};
    dibujar() {};
    acabar() {};
}