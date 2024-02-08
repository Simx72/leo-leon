import { Juego } from "../Juego";
import plantilla from './plantilla.html?raw';

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
    titulo = "";

    /**
     * 
     * @param path the path of the file
     * @param meta 
     */
    async cargarHtml(path: string) {
        let value = await import(/* @vite-ignore */path + "?raw") as {default: string};
        this.html = value.default;
    }
    async cargar() {
        await this.cargarHtml('./Escena.html');
    };
    iniciar() {
        if (this.html) {
            this.juego.contenedorPapa.innerHTML = plantilla
                .replace('[titulo]', this.titulo)
                .replace('[cuerpo]', this.html)
                .replace('[footer]', ''/* T*T */)
        }
    };
    actualizar(delta: number) {delta;};
    dibujar(delta: number) {delta;};
    acabar() {};
}