-- Script de Base de Datos para MySQL / phpMyAdmin
DROP DATABASE IF EXISTS BD_Gimnasio;
CREATE DATABASE BD_Gimnasio;
USE BD_Gimnasio;

CREATE TABLE Rol(
    id_Rol INT AUTO_INCREMENT PRIMARY KEY,
    descripcion VARCHAR(50)
);

CREATE TABLE Usuario(
    id_Usuario INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    correo VARCHAR(200) NOT NULL,
    contrasenia VARCHAR(30) NOT NULL,
    id_Rol INT NOT NULL,
    CONSTRAINT fk_usuario_rol
    FOREIGN KEY (id_Rol) REFERENCES Rol(id_Rol)
);

CREATE TABLE Cliente(
    id_Cliente INT AUTO_INCREMENT PRIMARY KEY,
    nombreCliente VARCHAR(30) NOT NULL,
    apPatCliente VARCHAR(20) NOT NULL,
    apMatCliente VARCHAR(20),
    fechaNac DATE NOT NULL,
    sexo VARCHAR(10) CHECK (sexo IN ('M','F','Otro')),
    id_Usuario INT NOT NULL,
    FOREIGN KEY (id_Usuario) REFERENCES Usuario(id_Usuario)
);

CREATE TABLE Tipo_Membresia(
    id_Tipo_Membresia INT AUTO_INCREMENT PRIMARY KEY,
    descripcion VARCHAR(100),
    monto DECIMAL(8,2) NOT NULL DEFAULT 0
);

CREATE TABLE Membresia(
    id_Membresia INT AUTO_INCREMENT PRIMARY KEY,
    fecha_Contratacion DATE NOT NULL,
    fecha_Finalizacion DATE NOT NULL,
    es_Vencido TINYINT(1) NOT NULL,
    id_Cliente INT NOT NULL,
    id_Tipo_Membresia INT NOT NULL,
    FOREIGN KEY (id_Cliente) REFERENCES Cliente(id_Cliente),
    FOREIGN KEY (id_Tipo_Membresia) REFERENCES Tipo_Membresia(id_Tipo_Membresia)
);

CREATE TABLE Turno(
    id_Turno INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(20),
    horaInicio TIME,
    horaFin TIME
);

CREATE TABLE Entrenador(
    id_Entrenador INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(30) NOT NULL,
    apPatEntrenador VARCHAR(20) NOT NULL,
    apMatEntrenador VARCHAR(20),
    sexo VARCHAR(10) CHECK (sexo IN ('M','F','Otro')),
    id_Usuario INT NOT NULL,
    id_Turno INT,
    FOREIGN KEY (id_Usuario) REFERENCES Usuario(id_Usuario),
    CONSTRAINT fk_entrenador_turno FOREIGN KEY (id_Turno) REFERENCES Turno(id_Turno)
);

CREATE TABLE Especialidad
(
    id_Especialidad INT AUTO_INCREMENT PRIMARY KEY,
    descripcion VARCHAR(50) NOT NULL
);

CREATE TABLE Especialidad_Entrenador
(
    id_Especialidad_Entrenador INT AUTO_INCREMENT PRIMARY KEY,
    id_Entrenador INT NOT NULL,
    id_Especialidad INT NOT NULL,
    CONSTRAINT FK_EE_Entrenador FOREIGN KEY (id_Entrenador) REFERENCES Entrenador(id_Entrenador),
    CONSTRAINT FK_EE_Especialidad FOREIGN KEY (id_Especialidad) REFERENCES Especialidad(id_Especialidad)
);

CREATE TABLE Dia(
    id_Dia INT AUTO_INCREMENT PRIMARY KEY,
    nombreDia VARCHAR(10),
    descripcion VARCHAR(30)
);

CREATE TABLE Horario(
    id_Horario INT AUTO_INCREMENT PRIMARY KEY,
    horaInicio TIME NOT NULL,
    horaFin TIME NOT NULL,
    descripcion VARCHAR(50),
    id_Dia INT NOT NULL,
    FOREIGN KEY (id_Dia) REFERENCES Dia(id_Dia)
);

CREATE TABLE Horario_Entrenador(
    id_Horario_Entrenador INT AUTO_INCREMENT PRIMARY KEY,
    id_Entrenador INT NOT NULL,
    id_Horario INT NOT NULL,
    FOREIGN KEY (id_Entrenador) REFERENCES Entrenador(id_Entrenador),
    FOREIGN KEY (id_Horario) REFERENCES Horario(id_Horario)
);

CREATE TABLE Producto(
    id_Producto INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    precio DECIMAL(10,2) CHECK (precio > 0),
    stock INT NOT NULL CHECK (stock >= 0)
);

CREATE TABLE Asistencia (
    id_Asistencia INT AUTO_INCREMENT PRIMARY KEY,
    id_Cliente INT NOT NULL,
    hora_Entrada TIME NOT NULL,
    hora_Salida TIME NOT NULL,
    slot_Duracion INT NOT NULL,
    CONSTRAINT chk_Asistencia_Duracion CHECK (slot_Duracion > 0 AND slot_Duracion < 900),
    FOREIGN KEY (id_Cliente) REFERENCES Cliente(id_Cliente)
);

-- Inserciones de datos principales
INSERT INTO Rol (descripcion) VALUES
('Administrador'),
('Cliente'),
('Entrenador');

INSERT INTO Tipo_Membresia (descripcion, monto) VALUES
('Dia',50.00),
('Semana',150.00),
('Mes',400.00),
('Año',4200.00);

INSERT INTO Turno (nombre, horaInicio, horaFin) VALUES
('Matutino','06:00:00','14:00:00'),
('Vespertino','14:00:00','22:00:00');

INSERT INTO Especialidad (descripcion) VALUES
('Crossfit'),
('Spinning'),
('Yoga'),
('Pesas');

INSERT INTO Dia (nombreDia, descripcion) VALUES
('Lunes','Inicio de semana'),
('Martes','Segundo día'),
('Miércoles','Media semana'),
('Jueves','Casi fin'),
('Viernes','Fin laboral'),
('Sábado','Fin de semana'),
('Domingo','Descanso');

INSERT INTO Horario (horaInicio, horaFin, descripcion, id_Dia) VALUES
('08:00:00','22:00:00','Todo el día',1),
('08:00:00','22:00:00','Todo el día',2),
('08:00:00','22:00:00','Todo el día',3),
('08:00:00','22:00:00','Todo el día',4),
('08:00:00','22:00:00','Todo el día',5),
('08:00:00','15:00:00','Solo medio día',6),
('00:00:00','00:00:00','Descansamos',7);
