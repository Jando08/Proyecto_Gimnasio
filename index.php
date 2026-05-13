<?php
session_start();
if(isset($_SESSION['usuario_id'])) {
    header("Location: php/dashboard.php");
    exit();
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>STEELYCO GYM | Iniciar Sesión</title>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&family=Roboto:wght@400;500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/styles.css">
    <style>
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('img/zona_pierna.jpg') no-repeat center center/cover;
            padding: 20px;
        }
        .auth-container {
            width: 100%;
            max-width: 500px;
        }
        .modal-content {
            position: relative;
            transform: none;
            top: 0; left: 0;
            width: 100%;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }
        #registerView {
            display: none;
        }
    </style>
</head>
<body>
    <div class="auth-container">
        <!-- Pantalla de Login -->
        <div class="modal-content" id="loginView">
            <div style="text-align: center; margin-bottom: 20px;">
                <a href="#" class="logo" style="font-size: 2.5rem;">STEELYCO<span>GYM</span></a>
            </div>
            <h2>Iniciar Sesión</h2>
            <p>Accede a tu panel de usuario</p>
            
            <form method="POST" action="php/login.php">
                <div class="input-group">
                    <label for="username">Usuario o Correo Electrónico</label>
                    <input type="text" id="username" name="username" placeholder="Usuario o Correo Electrónico" required>
                </div>
                <div class="input-group">
                    <label for="password">Contraseña</label>
                    <input type="password" id="password" name="password" placeholder="********" required>
                </div>
                <div class="form-actions">
                    <button type="submit" class="btn btn-primary btn-block">Entrar</button>
                </div>
                <div class="form-link">
                    ¿No tienes cuenta? <a href="#" id="showRegister">Regístrate aquí</a>
                </div>
            </form>
        </div>

        <!-- Pantalla de Registro -->
        <div class="modal-content" id="registerView">
            <div style="text-align: center; margin-bottom: 20px;">
                <a href="#" class="logo" style="font-size: 2.5rem;">STEELYCO<span>GYM</span></a>
            </div>
            <h2>Crear Cuenta</h2>
            <p>Únete a la familia STEELYCO GYM</p>
            
            <form method="POST" action="php/register.php">
                <div class="input-group">
                    <label>Usuario</label>
                    <input type="text" name="usuario" placeholder="Tu usuario" required>
                </div>
                <div class="input-group">
                    <label>Nombre</label>
                    <input type="text" name="nombre" placeholder="Tu nombre" required>
                </div>
                
                <div class="input-row">
                    <div class="input-group">
                        <label>Apellido Paterno</label>
                        <input type="text" name="ap_paterno" placeholder="Paterno" required>
                    </div>
                    <div class="input-group">
                        <label>Apellido Materno</label>
                        <input type="text" name="ap_materno" placeholder="Materno" required>
                    </div>
                </div>

                <div class="input-row">
                    <div class="input-group">
                        <label>Sexo</label>
                        <select name="sexo" required>
                            <option value="">Selecciona...</option>
                            <option value="M">Masculino</option>
                            <option value="F">Femenino</option>
                            <option value="Otro">Otro</option>
                        </select>
                    </div>
                    <div class="input-group">
                        <label>Fecha de Nacimiento</label>
                        <input type="date" name="fecha_nac" required>
                    </div>
                </div>

                <div class="input-group">
                    <label>Correo Electrónico</label>
                    <input type="email" name="email" placeholder="correo@ejemplo.com" required>
                </div>

                <div class="input-row">
                    <div class="input-group">
                        <label>Contraseña</label>
                        <input type="password" name="password" placeholder="********" required>
                    </div>
                    <div class="input-group">
                        <label>Confirmar Contraseña</label>
                        <input type="password" name="confirm_password" placeholder="********" required>
                    </div>
                </div>

                <div class="form-actions">
                    <button type="submit" class="btn btn-primary btn-block">Registrarme</button>
                </div>
                <div class="form-link">
                    ¿Ya tienes cuenta? <a href="#" id="showLogin">Inicia Sesión</a>
                </div>
            </form>
        </div>
    </div>

    <script>
        document.getElementById('showRegister').addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('loginView').style.display = 'none';
            document.getElementById('registerView').style.display = 'block';
        });

        document.getElementById('showLogin').addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('registerView').style.display = 'none';
            document.getElementById('loginView').style.display = 'block';
        });
    </script>
</body>
</html>
