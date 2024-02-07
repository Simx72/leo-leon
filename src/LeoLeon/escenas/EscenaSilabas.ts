import { Escena } from "./Escena";


export class EscenaSilabas extends Escena {
    cargar(): void {
        this.cargarHtml('./EscenaSilabas.html', import.meta.url);
    }
    iniciar(): void {
        
    }
    dibujar(_delta: number): void {
        
    }
}