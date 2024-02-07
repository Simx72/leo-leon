//namespace - espacio de nombre
//main loop - bucle principal
//aps - actualizaciones por segundo
//fps - fotogramas por segundo

namespace LeoLeon {
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
        }
        contenedorPapa: HTMLElement;
    }

    /**
     * Escena del juego
     */
    export class Escena {
        constructor() {

        }
    }

    /**
     * Bucle para el juego
     */
    namespace BuclePrincipal {
        let idEjecucion: number | null = null;
        let ultimoRegistro = 0;
        let aps = 0;
        let fps = 0;

        /**
         * Bucle principal que corre a 60fps
         * @param registroTemporal tiempo medido en milisegundos
         */
        export function iterar(registroTemporal: number = 0) {
            idEjecucion = window.requestAnimationFrame(iterar);

            actualizar(registroTemporal);

            dibujar(registroTemporal);

            // este if se cumple cada vez que pasa un segundo o mas
            // if (tiempo >= 1s):
            if (registroTemporal - ultimoRegistro > 999) {
                ultimoRegistro = registroTemporal; // asi el registro temporal avanza y el ultimo registro va por detras
                console.log(`APS: ${aps}\t| FPS: ${fps}`);
                aps = 0;
                fps = 0;
            }

        }

        export function detener(){}

        function actualizar(registroTemporal:  number) {
            aps++; // cada vez que actualiza, suma uno a los aps
        }

        function dibujar(registroTemporal: number){
            fps++; // cada vez que dibuja, suma un a los fps
        }
    }
}

export default LeoLeon;