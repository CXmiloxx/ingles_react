import { useState, useEffect } from 'react';
import './Body.css';
import { palabrasIngles, palabrasEspanol, pronunciaciones } from './palabras'; // Importar datos de palabras en ingles, español y pronunciaciones
import descripcionesPalabras from './descripcionesPalabras'; // Importar descripciones de palabras

function Body() {
    const [resultados, setResultados] = useState([]); // Estado para almacenar los resultados de la búsqueda
    const [letraSeleccionada, setLetraSeleccionada] = useState(''); // Estado para almacenar la letra seleccionada

    // Funcion para buscar terminos que comiencen con la letra proporcionada
    const buscarTerminos = (letra) => {
        const resultadosLetra = [];

        for (let i = 0; i < palabrasIngles.length; i++) {
            if (palabrasIngles[i].charAt(0).toLowerCase() === letra.toLowerCase()) {
                // Agregar descripcion si esta disponible
                const index = palabrasIngles.indexOf(palabrasIngles[i]);
                const descripcion = descripcionesPalabras[index];
                resultadosLetra.push({
                    palabraEspanol: palabrasEspanol[i],
                    palabraIngles: palabrasIngles[i],
                    pronunciacion: pronunciaciones[i],
                    numeroPalabra: i + 1,
                    descripcion: descripcion || '' // Usar descripción si esta disponible de lo contrario cadena vacía
                });
            }
        }

        setResultados(resultadosLetra); // Actualizar resultados de la búsqueda
        setLetraSeleccionada(letra); // Actualizar letra seleccionada
    }

    useEffect(() => {
        // Cuando el componente se monta por primera vez, buscar palabras que comiencen con "A"
        buscarTerminos('A');
    }, []); // El segundo argumento del useEffect (un array vacío) asegura que este efecto se ejecute solo una vez

    // Funcion para crear botones de letras
    const crearBotonesLetras = () => {
        const letras = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');
        return letras.map(letra => (
            <button key={letra} className={`letra-btn ${letra === letraSeleccionada ? 'active' : ''}`} onClick={() => buscarTerminos(letra)}>
                {letra}
            </button>
        ));
    }

    const totalPalabras = palabrasIngles.length; // Total de palabras en el glosario

    // Función para girar la tarjeta al hacer hover
    const volterarCard = (index) => {
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

    // Función para volver al inicio de la página
    const VolverIncio = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Desplazamiento suave
        });
    };

    return (
        <div className="body-container">
            <p className="total-palabras">Total palabras en el glosario: {totalPalabras}</p>
            <div className="abecedario-container">
                {crearBotonesLetras()}
            </div>
            <p className='palabras'>PALABRAS CON LA LETRA: {letraSeleccionada}</p>
            <div className='btnVolver'>
                <button className='btnParaVolver' onClick={VolverIncio}>volver</button>
            </div>
            <div className="resultado-container">
                {resultados.length > 0 ? (
                    resultados.map((resultado, index) => (
                        <div key={index} className="card" onMouseEnter={() => volterarCard(index)} onMouseLeave={() => volterarCard(index)}>
                            <div className="card-inner">
                                <div className="card-front">
                                    <h2 className="titulo">{resultado.palabraIngles}</h2>
                                    <p className='palabras'>{resultado.descripcion}</p>
                                    <p className='palabras'>Número de palabra: {resultado.numeroPalabra}</p>
                                    {/* Botón para pronunciar la palabra */}
                                    <button className="pronunciar-btn" onClick={() => pronunciarPalabra(resultado.palabraIngles)}>pronunciar</button>
                                </div>
                                <div className="card-back">
                                    <h2 className="titulo">INFORMACIÓN</h2>
                                    <p className='palabras-atras'>Palabra en inglés: {resultado.palabraIngles}</p>
                                    <p className='palabras-atras'>Palabra en español: {resultado.palabraEspanol}</p>
                                    <p className="palabras-atras">Fonética: {resultado.pronunciacion}</p>
                                    {/* Botón para pronunciar la palabra */}
                                    <button className="pronunciar-btn" onClick={() => pronunciarPalabra(resultado.palabraIngles)}>pronunciar</button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div>No se encontraron términos para la letra seleccionada.</div>
                )}
            </div>
            
        </div>
    );
}

export default Body;
