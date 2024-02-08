import { Escena } from "./Escena";

export class EscenaSilabas extends Escena {
    async cargar(): Promise<void> {
        await this.cargarHtml('./EscenaSilabas.html');
        this.titulo = "Silabas ⚒️"
    }
    iniciar(): void {
        super.iniciar();
        this.juego.contenedorPapa.classList.add('escena-silabas');
    }
    dibujar(_delta: number): void {
        
    }
    acabar(): void {
        this.juego.contenedorPapa.classList.remove('escena-silabas');
    }
}