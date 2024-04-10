import { useState } from 'react';
import './Body.css';
import { palabrasIngles, palabrasEspanol, pronunciaciones } from '../body/palabras';

function Body() {
    // Estado para almacenar los resultados de la búsqueda
    const [resultados, setResultados] = useState([]);

    // Función para buscar términos por letra
    const buscarTerminos = (letra) => {
        // Array para almacenar los resultados de la búsqueda
        const resultadosLetra = [];

        // Iterar sobre las palabras en inglés para encontrar aquellas que comienzan con la letra seleccionada
        for (let i = 0; i < palabrasIngles.length; i++) {
            if (palabrasIngles[i].charAt(0).toLowerCase() === letra.toLowerCase()) {
                // Agregar resultados a la lista
                resultadosLetra.push({
                    palabraEspanol: palabrasEspanol[i],
                    palabraIngles: palabrasIngles[i],
                    pronunciacion: pronunciaciones[i]
                });
            }
        }

        // Actualizar el estado con los resultados de la búsqueda
        setResultados(resultadosLetra);
    }

    // Función para crear botones de letras
    const crearBotonesLetras = () => {
        // Array de letras del alfabeto
        const letras = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');
        // Mapear cada letra para crear un botón y asignarle la función de búsqueda correspondiente
        return letras.map(letra => (
            <button key={letra} className="letra-btn" onClick={() => buscarTerminos(letra)}>
                {letra}
            </button>
        ));
    }

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
        <div className="letras-container">
            {/* Etiqueta para buscar términos por letra */}
            <label htmlFor="letraInput">Buscar términos por letra:</label>
            {/* Contenedor de botones de letras */}
            <div className="letra-btn-container">{crearBotonesLetras()}</div>
            {/* Contenedor para mostrar los resultados de la búsqueda */}
            <div id="resultado">
                {/* Mostrar los resultados si hay algún resultado */}
                {resultados.length > 0 ? (
                    resultados.map((resultado, index) => (
                        <div key={index} className="palabra">
                            {/* Detalles de la palabra */}
                            <b>Palabra en español:</b> {resultado.palabraEspanol}<br />
                            <b>Palabra en inglés:</b> {resultado.palabraIngles}<br />
                            <b>Fonética de la palabra:</b> {resultado.pronunciacion}<br />
                            {/* Botón para pronunciar la palabra en inglés */}
                            <button onClick={() => pronunciarPalabra(resultado.palabraIngles)}>Pronunciar</button>
                        </div>
                    ))
                ) : (
                    // Mensaje si no se encontraron resultados
                    <div>No se encontraron términos para la letra seleccionada.</div>
                )}
            </div>
        </div>
    );
}

export default Body;
