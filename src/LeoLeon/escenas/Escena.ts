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
    footer = "";

    /**
     * 
     * @param path the path of the file
     * @param meta 
     */
    async cargarHtml(url: string): Promise<void> {
        let res = await this.solicitarRecurso<string>(url);
        this.html = res;
    }
    async cargar() {
        await this.cargarHtml('./Escena.html');
    };
    iniciar() {
        if (this.html) {
            this.juego.contenedorPapa.innerHTML = plantilla
                .replace('[titulo]', this.titulo)
                .replace('[cuerpo]', this.html)
                .replace('[footer]', this.footer)
        }
    };
    actualizar(delta: number) {delta;}
    dibujar(delta: number) {delta;}
    acabar() {}
    solicitarRecurso<T>(url: string) {
        return new Promise<T>(function (resolve, reject) {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    resolve(xhr.response);
                } else {
                    reject({
                        status: this.status,
                        statusText: xhr.statusText
                    });
                }
            };
            xhr.onerror = function () {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            };
            xhr.send();
        });
    }
}