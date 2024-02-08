import { Escena } from "./Escena";
import html from "./EscenaSilabas.html?url";
import letrasJson from '../../assets/json/letras.json';

export class EscenaSilabas extends Escena {
    async cargar(): Promise<void> {
        await this.cargarHtml(html);
        this.titulo = "Silabas ⚒️"
    }
    colVoc!: HTMLDivElement; // columna de vocales
    colCon!: HTMLDivElement; // columna de consonantes
    zonaLF!: HTMLDivElement; // zona de letras flotantes
    iniciar(): void {
        super.iniciar();
        let colL = document.querySelector('.col-l');
        if (colL) {
            this.colVoc = <HTMLDivElement>colL;
        }
        let colR = document.querySelector('.col-r');
        if (colR) {
            this.colCon = <HTMLDivElement>colR;
        }
        let colC = document.querySelector('.col-c');
        if (colC) {
            this.zonaLF = <HTMLDivElement>colC;
        }

        this.addLetras();
        this.addEvents();


    }
    acabar(): void {
        super.acabar();
    }



    addLetras() {
        console.log(letrasJson);
        this.letras = [];
        this.letrasFlotantes = [];
        letrasJson.forEach(letra => {
            let nueva = document.createElement('div');
            nueva.classList.add('bloque');
            nueva.setAttribute('data-letra', letra.LETRA);
            let text = document.createTextNode(letra.MINUSCULA);
            nueva.appendChild(text);
            if (letra.VOCAL) {
                nueva.classList.add('vocal');
                nueva.setAttribute('data-vocal', 'true');
                this.colVoc.appendChild(nueva);
            } else {
                nueva.classList.add('conso');
                this.colCon.appendChild(nueva);
                nueva.setAttribute('data-vocal', 'false');
            }
            this.letras.push(nueva);
        })
    }

    letras!: HTMLDivElement[];
    letrasFlotantes!: HTMLDivElement[];


    addEvents() {
        this.letras.forEach(letra => {
            letra.addEventListener('mousedown', ev => {
                ev.preventDefault();
                // let {clientLeft: x, clientTop: y} = ev.target as HTMLDivElement;
                console.log('mousedown');
                this.nuevoBloqueFlotante(ev.target as HTMLDivElement);

            })
            // letra.addEventListener('mouseleave', ev=>{
            //     ev.preventDefault();
            //     // let {clientLeft: x, clientTop: y} = ev.target as HTMLDivElement;
            //     console.log('leave');
            // })
        })
        window.addEventListener('mousemove', ev => {
            this.mouseX = ev.clientX;
            this.mouseY = ev.clientY;
        })
    }

    mouseX = 0;
    mouseY = 0;

    nuevoBloqueFlotante(desde: HTMLDivElement) {
        let infoLetra: {
            id: null | string,
            vocal: boolean
        } = {
            id: null,
            vocal: false
        }

        infoLetra.id = desde.getAttribute('data-letra');
        infoLetra.vocal = Boolean(desde.getAttribute('data-vocal'));

        let letra = letrasJson.find(l => l.LETRA == infoLetra.id);

        if (letra) {
            console.log('creando nuevo bloque', letra);

            let nueva = document.createElement('div');
            nueva.classList.add('bloque', 'flotante');
            let text = document.createTextNode(letra.MINUSCULA);
            nueva.appendChild(text);
            this.seleccionado = nueva;
            if (letra.VOCAL) {
                nueva.classList.add('vocal');
                nueva.setAttribute('vocal', 'true');
                this.zonaLF.appendChild(nueva);
            } else {
                nueva.classList.add('conso');
                this.zonaLF.appendChild(nueva);
                nueva.setAttribute('vocal', 'false');
            }
            this.letrasFlotantes.push(nueva);
        } else {
            console.log('no encontramos ninguna letra ', infoLetra);
        }
    }

    seleccionado: null | HTMLDivElement = null;
    moviendo = false;
    mover(element: HTMLDivElement, x: number, y: number) {
        element.style.left = x + "px";
        element.style.top = y + "px";
    }

    actualizar(_delta: number): void {
        if (this.seleccionado) {
            this.mover(this.seleccionado, this.mouseX, this.mouseY);
        }
    }
}