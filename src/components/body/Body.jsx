import { useState } from 'react';
import './Body.css';
import { palabrasIngles, palabrasEspanol, pronunciaciones } from './palabras';
import descripcionesPalabras from './descripcionesPalabras'; 

function Body() {
    const [resultados, setResultados] = useState([]);
    const [letraSeleccionada, setLetraSeleccionada] = useState('');

    const buscarTerminos = (letra) => {
        const resultadosLetra = [];

        for (let i = 0; i < palabrasIngles.length; i++) {
            if (palabrasIngles[i].charAt(0).toLowerCase() === letra.toLowerCase()) {
                // Agregar descripción si está disponible
                const index = palabrasIngles.indexOf(palabrasIngles[i]);
                const descripcion = descripcionesPalabras[index];
                resultadosLetra.push({
                    palabraEspanol: palabrasEspanol[i],
                    palabraIngles: palabrasIngles[i],
                    pronunciacion: pronunciaciones[i],
                    numeroPalabra: i + 1,
                    descripcion: descripcion || '' // Usar descripción si está disponible, de lo contrario, cadena vacía
                });
            }
        }

        setResultados(resultadosLetra);
        setLetraSeleccionada(letra);
    }

    const crearBotonesLetras = () => {
        const letras = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');
        return letras.map(letra => (
            <button key={letra} className={`letra-btn ${letra === letraSeleccionada ? 'active' : ''}`} onClick={() => buscarTerminos(letra)}>
                {letra}
            </button>
        ));
    }

    const totalPalabras = palabrasIngles.length;

    const flipCard = (index) => {
        const cards = document.querySelectorAll('.card');
        cards.forEach((card, i) => {
            if (i === index) {
                card.classList.toggle('flipped');
            } else {
                card.classList.remove('flipped');
            }
        });
    };

    // Función para pronunciar una palabra
    const pronunciarPalabra = (palabra) => {
        // Cancelar cualquier pronunciación actual
        const speechSynthesis = window.speechSynthesis;
        speechSynthesis.cancel();

        // Crear un objeto SpeechSynthesisUtterance para pronunciar la palabra
        const mensaje = new SpeechSynthesisUtterance(palabra);
        mensaje.volume = 1.5;
        mensaje.rate = 0.7;
        mensaje.pitch = 1;
        mensaje.lang = 'en-US';

        // Pronunciar la palabra
        speechSynthesis.speak(mensaje);
    }

    return (
        <div className="body-container">
            <p className="total-palabras">Total words in the glossary: {totalPalabras}</p>
            <div className="abecedario-container">
                {crearBotonesLetras()}
            </div>
            <p>WORDS WITH THE LETTER :{letraSeleccionada}</p>
            <div className="resultado-container">
                {resultados.length > 0 ? (
                    resultados.map((resultado, index) => (
                        <div key={index} className="card" onMouseEnter={() => flipCard(index)} onMouseLeave={() => flipCard(index)}>
                            <div className="card-inner">
                                <div className="card-front">
                                    <p className='descripcion'>{resultado.descripcion}</p>
                                    <p>Word number:{resultado.numeroPalabra}</p>
                                    {/* Botón para pronunciar la palabra */}
                                    <button className="pronunciar-btn" onClick={() => pronunciarPalabra(resultado.palabraIngles)}>to pronounce</button>

                                </div>
                                <div className="card-back">
                                    <h5 className='palabraEspanol'>Palabra en español: {resultado.palabraEspanol}</h5>
                                    <h5 className='palabraIngles'>Palabra en inglés: {resultado.palabraIngles}</h5>
                                    <span className="pronunciacion">Fonética: {resultado.pronunciacion}</span>
                                    {/* Botón para pronunciar la palabra */}
                                    <button className="pronunciar-btn" onClick={() => pronunciarPalabra(resultado.palabraIngles)}>to pronounce</button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div>No terms were found for the selected letter.</div>
                )}
            </div>
        </div>
    );
}

export default Body;
