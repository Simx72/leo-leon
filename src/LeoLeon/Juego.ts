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
        
        this._escenas = [];
        this._actualEscena = 0;
        this.adjuntarEscena(EscenaSilabas).then((indice) => {
            this._actualEscena = indice;    
            this._cambiarEscena(this.actualEscena);
            this.actualEscena.iniciar();
            
            
            this.iniciarBucle();
        });
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
    async adjuntarEscena(NuevaEscena: typeof Escena): Promise<number> {
        let nueva = new NuevaEscena(this);
        await nueva.cargar();
        let indice = this._escenas.push(nueva) - 1;
        return indice;
    }

    /**
     * pone la nueva escena en el bucle
     * @param escena nueva escena
     */
    private _cambiarEscena(escena: Escena) {
        this._actualizar = (delta) => escena.actualizar(delta);
        this._dibujar = (delta) => escena.dibujar(delta);
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
        this._cambiarEscena(nueva);
        nueva.iniciar();
        this.iniciarBucle();
    }

    detenerBucle() {
        BuclePrincipal.detener();
    }

    iniciarBucle() {
        BuclePrincipal.iniciar(
            (delta) => this._actualizar(delta),
            (delta) => this._dibujar(delta)
        );
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