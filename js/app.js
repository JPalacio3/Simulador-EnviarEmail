document.addEventListener('DOMContentLoaded',function () {

    // Seleccionar los elementos de la interfaz
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');


    // Asignar eventos
    inputEmail.addEventListener('input',validar)
    inputAsunto.addEventListener('input',validar)
    inputMensaje.addEventListener('input',validar);
    btnReset.addEventListener('click',function (e) {
        e.preventDefault();

        // Reiniciar el objeto
        email.email = '';
        email.asunto = '';
        email.mensaje = '';

        formulario.reset();
        comprobarEmail();
    })

    // Objeto que contiene los campos del formulario
    const email = {
        email: '',
        asunto: '',
        mensaje: ''
    }

    function validar(e) {
        if (e.target.value.trim() === '') {
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`,e.target.parentElement);
            email[ e.target.name ] = '';
            comprobarEmail();
            return;
        }

        // Validar que el email sea correcto
        if (e.target.id === 'email' && !validarEmail(e.target.value)) {
            mostrarAlerta('El Email NO es válido',e.target.parentElement);
            email[ e.target.name ] = '';
            comprobarEmail()
            return;
        }

        // En caso de pasar la validación se elimina la alerta
        limpiarAlerta(e.target.parentElement);

        // Asignar los valores en el objeto
        email[ e.target.name ] = e.target.value.trim().toLowerCase();
        // Comprobar el objeto de email
        comprobarEmail();
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

    // Función encargada de comprobar el arreglo creado a partir del objeto email
    // y habilitar el botón de envío cuando el formulario esté correctamente diligenciado
    function comprobarEmail() {
        if (!Object.values(email).includes('')) {
            btnSubmit.classList.remove('opacity-50');
            btnSubmit.disabled = false;
        } else {
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
            return;
        }
    }

});
