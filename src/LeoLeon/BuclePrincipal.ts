/**
 * Bucle para el juego
 */
namespace BuclePrincipal {
    let idEjecucion: number | null = null;
    let ultimoSegundo = 0;
    let ultimoRegistro = 0;
    let aps = 0;
    let fps = 0;

    export let lastAPS = 0;
    export let lastFPS = 0;

    export function iniciar(actualizar: (delta:number) => void, dibujar: (delta:number) => void) {
        actualizarJuego = actualizar;
        dibujarJuego = dibujar;
        console.log('[bucle] Iniciando con ', actualizarJuego, dibujarJuego);
        iterar();
    }

    /**
     * Bucle principal que corre a 60fps
     * @param registroTemporal tiempo medido en milisegundos
     */
    function iterar(registroTemporal: number = 0) {
        idEjecucion = window.requestAnimationFrame(iterar);

        _actualizar(registroTemporal);

        _dibujar(registroTemporal);

        // este if se cumple cada vez que pasa un segundo o mas
        // if (tiempo >= 1s):
        if (registroTemporal - ultimoSegundo > 999) {
            ultimoSegundo = registroTemporal; // asi el registro temporal avanza y el ultimo registro va por detras
            console.log(`APS: ${aps}\t| FPS: ${fps}`);
            lastFPS = fps;
            lastAPS = aps;
            aps = 0;
            fps = 0;
        }

    }

    export function detener(){
        console.log('[bucle] Deteniendo')
        if (idEjecucion) {
            window.cancelAnimationFrame(idEjecucion);
        }
    }

    let delta = 0;

    function _actualizar(registroTemporal:  number) {
        aps++; // cada vez que actualiza, suma uno a los aps
        delta = registroTemporal - ultimoRegistro;
        ultimoRegistro = registroTemporal;
        actualizarJuego(delta);
    }

    function _dibujar(_registroTemporal: number){
        fps++; // cada vez que dibuja, suma un a los fps
        dibujarJuego(delta);
    }

    /**
     * actualiza las variables del juego
     * @param delta milisegundos desde el ultimo fotograma
     */
    let actualizarJuego = (delta: number) => {delta;};
    
    /**
     * Dibuja todo en el juego
     */
    let dibujarJuego = (delta: number) => {delta;};
}

export { BuclePrincipal };