/**
 * Script para cargar diapositivas dinámicamente
 * Este archivo gestiona la carga de las diapositivas individuales y configura
 * la interactividad de los elementos después de que se cargue el contenido.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Array con las rutas de las diapositivas
    const slideFiles = [
        'slides/slide1.html', // Título Inicial
        'slides/slide2.html', // ¿Recuerdas tu primer sistema?
        'slides/slide3.html', // Lo que aprendí del caos
        'slides/slide4.html', // De aprendiz a arquitecto
        'slides/slide5.html', // Los errores que todos repetimos
        'slides/slide6.html', // Pensar como arquitecto hoy
        'slides/slide7.html',  // El sistema y el negocio: una pareja inseparable
        'slides/slide8.html',
        'slides/slide9.html',
        'slides/slide10.html',
        'slides/slide11.html',
        'slides/slide12.html'
    ];

    const slidesContainer = document.getElementById('presentation-slides');

    // Cargar todas las diapositivas
    Promise.all(slideFiles.map(file =>
        fetch(file)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error cargando ${file}: ${response.status}`);
                }
                return response.text();
            })
    ))
        .then(slidesContent => {
            // Agregar cada diapositiva al contenedor
            slidesContent.forEach(content => {
                slidesContainer.innerHTML += content;
            });

            // Inicializar Reveal.js después de cargar todas las diapositivas
            Reveal.initialize({
                // Opciones de configuración
                controls: true,       // Mostrar controles de navegación
                progress: true,       // Mostrar barra de progreso
                center: true,         // Centrar contenido de diapositivas
                hash: true,           // Usar hash en URL para navegación
                transition: 'slide',  // Estilo de transición entre diapositivas

                // Plugins activos
                plugins: [ RevealMarkdown, RevealHighlight, RevealNotes ]
            });

            // Configurar comportamiento interactivo después de inicializar Reveal.js
            setupInteractiveElements();
        })
        .catch(error => {
            console.error('Error cargando las diapositivas:', error);
            // Mostrar mensaje de error en caso de fallo
            slidesContainer.innerHTML = `
      <section>
        <h2>Error al cargar las diapositivas</h2>
        <p>${error.message}</p>
        <p>Verifica que las carpetas y archivos estén correctamente estructurados.</p>
      </section>
    `;
        });
});

/**
 * Configura los elementos interactivos de la presentación
 * Esta función se ejecuta después de cargar todas las diapositivas
 */
function setupInteractiveElements() {
    // Configurar comportamiento de experiencias desplegables
    document.querySelectorAll('.experience').forEach(item => {
        item.addEventListener('click', function() {
            const content = this.querySelector('.experience-content');
            content.style.display = content.style.display === 'none' ? 'block' : 'none';
        });
    });

    // Configurar comportamiento de lista de errores (con efecto de "check")
    document.querySelectorAll('.error-item').forEach(item => {
        item.addEventListener('click', function() {
            this.classList.toggle('checked');
        });
    });

    // Añadir efecto de hover para las cajas de herramientas
    document.querySelectorAll('.tool-box').forEach(box => {
        box.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });

        box.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}
