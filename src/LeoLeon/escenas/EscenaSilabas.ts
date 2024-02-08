import { Escena } from "./Escena";
import html from "./EscenaSilabas.html?url";
import letrasJson from '../../assets/json/letras.json';
import 'animate.css/animate.min.css';

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
                // console.log('mousedown');
                this.nuevoBloqueFlotante(ev.target as HTMLDivElement);

            })
        })
        window.addEventListener('mousemove', ev => {
            this.mouseX = ev.clientX;
            this.mouseY = ev.clientY;
        })
        window.addEventListener('mouseup', _ev => {
            this.seleccionado = null;
        })
    }

    mouseX = 0;
    mouseY = 0;

    nuevoBloqueFlotante(desde: HTMLDivElement) {
        // encontrar la letra
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

        // verificarla
        if (letra) {
            // crearla
            console.log('creando nuevo bloque', letra);

            let nueva = document.createElement('div');
            nueva.classList.add('bloque', 'flotante', 'animate__bounceIn');
            let text = document.createTextNode(letra.MINUSCULA);
            nueva.appendChild(text);
            if (letra.VOCAL) {
                nueva.classList.add('vocal');
                nueva.setAttribute('vocal', 'true');
            } else {
                nueva.classList.add('conso');
                nueva.setAttribute('vocal', 'false');
            }

            // añadirla al DOM
            this.zonaLF.appendChild(nueva);

            // seleccionarla: una letra seleccionada se mueve con el cursor
            this.seleccionado = nueva;
            
            // añadirla a las letras existentes
            this.letrasFlotantes.push(nueva);

            // añadir eventos
            nueva.addEventListener('mousedown', _ev => {
                if (!this.oprimiendoEliminar) {
                    this.seleccionado = nueva;
                }
            })

            // añadir boton de eliminar
            this.nuevoBotonEliminar(nueva);
            
        } else {
            console.log('no encontramos ninguna letra ', infoLetra);
        }
    }

    _seleccionado: null | HTMLDivElement = null;
    get seleccionado (): null | HTMLDivElement {
        return this._seleccionado;
    }
    set seleccionado(elemento: null | HTMLDivElement) {
        if (this._seleccionado) {
            this._seleccionado.setAttribute('data-agarra', 'false');
        }
        if (elemento) {
            elemento.setAttribute('data-agarra', 'true');
        }
        this._seleccionado = elemento;
    }

    moviendo = false;
    mover(element: HTMLDivElement, x: number, y: number) {
        element.style.left = (x - 30) + "px";
        element.style.top = (y - 30) + "px";
    }

    actualizar(_delta: number): void {
        if (this.seleccionado) {
            this.mover(this.seleccionado, this.mouseX, this.mouseY);
        }
    }

    oprimiendoEliminar = false;
    nuevoBotonEliminar (letra: HTMLDivElement) {
        // crear boton
        let btn = document.createElement('button');
        
        // configurar boton
        btn.classList.add('boton-eliminar');
        btn.innerText = 'X';
        btn.addEventListener('mousedown', ev => {
            ev.preventDefault();
            this.oprimiendoEliminar = true;
        })
        btn.addEventListener('mouseup', ev => {
            ev.preventDefault();
            if (this.oprimiendoEliminar) {
                // configurar protocolo de desaparición >:)
                letra.addEventListener('animationend', () => {
                    let indice = this.letrasFlotantes.indexOf(letra);
                    this.letrasFlotantes.splice(indice, 1);
                    letra.remove();
                    this.oprimiendoEliminar = false;
                })
                // iniciar protocolo de desaparición
                letra.classList.add('animate__zoomOut');
            }
        })
        
        // añadir boton
        letra.appendChild(btn);
    }
}

/* 
Por hacer:

Añadir boton mayusculas y minusculas (en el footer)

Añadir sonidos (cuando de click a la letra)

Añadir unirse en bloques


*/