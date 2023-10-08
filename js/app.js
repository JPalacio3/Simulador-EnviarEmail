document.addEventListener('DOMContentLoaded',function () {

    // Seleccionar los elementos de la interfaz
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');

    // Asignar eventos
    inputEmail.addEventListener('blur',validar)
    inputAsunto.addEventListener('blur',validar)
    inputMensaje.addEventListener('blur',validar);

    function validar(e) {
        if (e.target.value.trim() === '') {
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`,e.target.parentElement);
            return;
        }

        // Validar que el email sea correcto
        if (e.target.id === 'email' && !validarEmail(e.target.value)) {
            mostrarAlerta('El Email NO es válido',e.target.parentElement);
            return;
        }

        // En caso de pasar la validación se elimina la alerta
        limpiarAlerta(e.target.parentElement);
    }

    // Función para mostrar la alerta visual
    function mostrarAlerta(mensaje,referencia) {
        limpiarAlerta(referencia);

        // Generar alerta con HTML
        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('bg-red-600','text-white','p-2','text-center');

        // Inyectar el error al formulario
        referencia.appendChild(error);
    }

    // Función encargada de limpiar la alerta cuando se pasa la validación
    function limpiarAlerta(referencia) {
        // Comprueba si ya existe una alerta
        const alerta = referencia.querySelector('.bg-red-600');
        if (alerta) {
            alerta.remove();
        }
    }

    // Función encargada de validar que el formato del email sea válido
    function validarEmail(email) {
        const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const resultado = regex.test(email);
        return resultado;
    }
});
