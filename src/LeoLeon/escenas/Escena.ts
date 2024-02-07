import { Juego } from "../Juego";

/**
 * Escena del juego
 */
export class Escena {
    constructor(juego: Juego) {
        this.juego = juego;
        console.log('Creando escena ', this, 'para el juego ', juego);
    }
    juego: Juego;
    html: string | null = null;

    /**
     * 
     * @param path the path of the file
     * @param meta 
     */
    cargarHtml(path: string, meta: string) {
        let url = new URL(path, meta).href
        console.log(url);
    }
    cargar() {};
    iniciar() {};
    actualizar(delta: number) {delta;};
    dibujar(delta: number) {delta;};
    acabar() {};
}