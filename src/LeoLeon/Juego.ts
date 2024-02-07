import { BuclePrincipal } from "./BuclePrincipal";
import { Escena } from "./escenas/Escena";
import { EscenaSilabas } from "./escenas/EscenaSilabas";

/**
 * Inicia el juego
 */
export class Juego {
    constructor(contenedorPapa: string | HTMLElement) {
        if (typeof contenedorPapa == 'string') {
            let res = document.querySelector<HTMLElement>(contenedorPapa);
            if (res == null) {
                throw new Error(`No se pudo encontrar el elemento '${contenedorPapa}'. Revise la consulta y asegurese que el elemento existe en el DOM.`);
            } else {
                this.contenedorPapa = res;
            }
        } else {
            this.contenedorPapa = contenedorPapa;
        }

        this._actualizar = function(){};
        this._dibujar = function(){};
        this.iniciarBucle();

        this._escenas = [];
        this._actualEscena = this.adjuntarEscena(EscenaSilabas);
        this._cambiarEscena(this._escenas[this._actualEscena]);


    }
    contenedorPapa: HTMLElement;
    
    private _escenas: Escena[];
    _actualEscena: number; // indice de la escena en el arreglo escenas

    get actualEscena() {
        return this._escenas[this._actualEscena];
    }

    /**
     * Adjunta una escena al arreglo y devuelve el indice de esta
     * @param NuevaEscena la clase de la nueva escena (no una instancia!)
     */
    adjuntarEscena(NuevaEscena: typeof Escena): number {
        let nueva = new NuevaEscena(this);
        nueva.cargar();
        let indice = this._escenas.push(nueva);
        return indice;
    }

    /**
     * pone la nueva escena en el bucle
     * @param escena nueva escena
     */
    private _cambiarEscena(escena: Escena) {
        this._actualizar = escena.actualizar;
        this._dibujar = escena.dibujar;
    }

    /**
     * cambia de la vieja a la nueva escena
     * @param indice indice de la nueva escena
     */
    cambiarEscena(indice: number) {
        this.detenerBucle();
        let vieja = this.actualEscena;
        let nueva = this._escenas[indice];
        vieja.acabar();
        nueva.iniciar();
        this._cambiarEscena(nueva);
        this.iniciarBucle();
    }

    detenerBucle() {
        BuclePrincipal.detener();
    }

    iniciarBucle() {
        BuclePrincipal.iniciar(this._actualizar, this._dibujar)
    }


    private _actualizar: (delta: number) => void;
    private _dibujar: (delta: number) => void;
    


    get fps() {
        return BuclePrincipal.lastFPS;
    }

    get aps() {
        return BuclePrincipal.lastAPS;
    }


}