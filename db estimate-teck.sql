--DROP DATABASE estimate_teck
CREATE DATABASE estimate_teck
GO

USE estimate_teck
GO

CREATE TABlE Estado_Usuario_Empleado
(
    Estado_Id INT NOT NULL IDENTITY CONSTRAINT Pk_Estado_Empleado PRIMARY KEY(Estado_Id),
    Estado VARCHAR(15) NOT NULL
);
GO

--INSERT ESTADO USUARIO

INSERT INTO Estado_Usuario_Empleado (Estado) VALUES ('Activo');
GO
INSERT INTO Estado_Usuario_Empleado (Estado) VALUES ('Inactivo');
GO




CREATE TABLE Cargo
(
    Cargo_Id INT NOT NULL IDENTITY CONSTRAINT Pk_cargo_Id PRIMARY KEY(Cargo_Id),
    Nombre VARCHAR(100) NOT NULL,
    Descripcion VARCHAR(255) NOT NULL
);
GO
-- INSERT CARGO--


INSERT INTO  Cargo (Nombre,Descripcion) VALUES ('Frontend Development', 'Programador que trabaja la parte de la
aplicaci�n  con la que interactua el usuario');
GO

INSERT INTO cargo (Nombre,Descripcion) VALUES ('Backend Development','Programador que se encarga de trabajar
con la parte de la aplicacion que el usuario no puede ver');
GO

INSERT INTO cargo (Nombre,Descripcion) VALUES ('Full-Stacks Development','Programador que trabaja todos los 
aspectos de una aplicaci�n, incluidos Frontend y backend');
GO

INSERT INTO cargo (Nombre,Descripcion) VALUES ('Mobile Development','Programador que trabaja las aplicaciones 
Moviles');
GO

INSERT INTO cargo (Nombre,Descripcion) VALUES ('Dise�ador UX','Es el profesional que gestiona la experiencia del usuario 
con un producto digital. Su objetivo es que la interacci�n del usuario con el producto sea sencilla e intuitiva');
GO

INSERT INTO cargo (Nombre,Descripcion) VALUES ('Gerente general','N/A');
GO

INSERT INTO cargo (Nombre,Descripcion) VALUES ('Coordinadora de proyecto','N/A');
GO


CREATE TABLE Empleado
(
    Empleado_Id INT NOT NULL IDENTITY(1,1) CONSTRAINT Pk_empleadoId PRIMARY KEY(empleado_Id),
    Estado_Id INT NOT NULL DEFAULT 1 CONSTRAINT FK_Estado_UsuarioEmpleado FOREIGN KEY REFERENCES Estado_Usuario_Empleado(Estado_Id),
    Cargo_Id INT NOT NULL CONSTRAINT Fk_Cargo_Empleado FOREIGN KEY REFERENCES Cargo(Cargo_Id),
    Nombre VARCHAR(25) NOT NULL,
    Apellido VARCHAR(25) NOT NULL,
    Identificacion VARCHAR(15) NOT NULL,
    Email VARCHAR(255) NOT NULL,
    Telefono_Residencial VARCHAR(15) NULL,
    Celular VARCHAR(15) NOT NULL,
    Pais VARCHAR(255) NOT NULL,
	Provincia VARCHAR(255) NOT NULL,
    Direccion VARCHAR(255) NOT NULL,
    Fecha_Creacion DATETIME DEFAULT GETDATE()
);
GO

CREATE TABLE Rol
(
    Id_rol INT NOT NULL IDENTITY(1,1) CONSTRAINT PK_Rol PRIMARY KEY(Id_rol),
    Nombre VARCHAR(25) NOT NULL
);
GO

-- insert Roles 

INSERT INTO Rol(Nombre) VALUES ('Gerente de TIC');
GO
INSERT INTO Rol(Nombre) VALUES ('Encargado de proyectos');
GO
INSERT INTO Rol(Nombre) VALUES ('Gerente general');
GO




CREATE TABLE Usuario
(
	Usuario_Id INT NOT NULL IDENTITY CONSTRAINT Pk_Usuario PRIMARY KEY (Usuario_Id),
	Empleado_Id INT NOT NULL CONSTRAINT Fk_EmpleadoUsuarioId FOREIGN KEY REFERENCES Empleado (Empleado_Id),
	EstadoUsuario_Id INT NOT NULL CONSTRAINT FK_Estado_Usuario FOREIGN KEY REFERENCES Estado_Usuario_Empleado(Estado_Id),
	Id_rol INT NOT NULL CONSTRAINT Fk_RolUsuario FOREIGN KEY REFERENCES Rol (Id_rol),
	PasswordHast VARBINARY(Max) NOT NULL,
	PasswordSalt VARBINARY(Max) NOT NULL,
	fechaCreacion DATETIME DEFAULT GETDATE()
);
GO

CREATE TABLE TipoCliente
(
	Tipo_Id int not null identity constraint Pk_TipoCliente Primary key(Tipo_Id),
	NombreTipo_Cliente VARCHAR(25) NOT NULL
);
GO


INSERT INTO TipoCliente(NombreTipo_Cliente) VALUES ('Persona Fisica');
GO
INSERT INTO TipoCliente(NombreTipo_Cliente) VALUES ('Empresarial');
GO
INSERT INTO TipoCliente(NombreTipo_Cliente) VALUES ('Gubernamental');
GO
INSERT INTO TipoCliente(NombreTipo_Cliente) VALUES ('Sin requisito fiscal'); 
GO

CREATE TABLE Cliente
(
	Cliente_Id INT NOT NULL IDENTITY CONSTRAINT Pk_Cliente Primary key (Cliente_Id),
	Tipo_Id INT NOT NULL CONSTRAINT Fk_TipoClienteId FOREIGN KEY REFERENCES TipoCliente (Tipo_Id),
	Nombre_Cliente VARCHAR(255) NOT NULL,
	Tipo_identificacion VARCHAR(255) NOT NULL,
    Identificacion VARCHAR(15) NOT NULL,
    Email VARCHAR(255) NOT NULL,
    Telefono_Residencial VARCHAR(15) NULL,
    Celular VARCHAR(15) NOT NULL,
	Pais VARCHAR(255) NOT NULL,
	Estado VARCHAR(255) NULL,
    Direccion VARCHAR(255) NOT NULL,
    Fecha_Creacion DATETIME DEFAULT GETDATE()

);
GO

CREATE TABLE TarifarioHora
(
	Tarifario_Id int not null identity constraint Pk_TarifarioId primary key (Tarifario_Id),
	Cargo_Id INT NOT NULL CONSTRAINT Fk_Cargo_Usuario FOREIGN KEY REFERENCES Cargo(Cargo_Id),
	Usuario_Id INT NOT NULL CONSTRAINT Fk_Usuario_Id FOREIGN KEY REFERENCES Usuario(Usuario_Id),
	MontoTarifa money not null,
	Fecha_Creacion DATETIME NOT NULL
);
GO

CREATE TABLE ProductividadPuntoFuncion
(
	Productividad_Id int not null identity constraint Pk_ProductividadId primary key (Productividad_Id),
	Usuario_Id int not null constraint Fk_UsuarioProductividad_Id foreign key references Usuario(Usuario_Id),
	Estado_Id int not null constraint Fk_EstadoProductividad_Id foreign key references Estado_Usuario_Empleado(Estado_Id),
	NombrePlataforma VARCHAR(255) NOT NULL,
	NivelBajo int,
	NivelMedio int,
	NivelAlto int,
	Fecha_Creacion DATETIME DEFAULT GETDATE()
);
Go

CREATE TABLE EstadoProyecto
(
	EstadoProyecto_Id INT NOT NULL IDENTITY CONSTRAINT Pk_EstadoProyecto Primary key (EstadoProyecto_Id),
	Nombre_EstadoProyecto VARCHAR(50) NOT NULL
);
GO


CREATE TABLE Proyecto
(
	Proyecto_Id INT NOT NULL IDENTITY CONSTRAINT Pk_ProyectoId Primary key (Proyecto_Id),
	EstadoProyecto_Id INT NOT NULL CONSTRAINT Fk_EstadoProyecto_Id FOREIGN KEY REFERENCES EstadoProyecto (EstadoProyecto_Id),
	Usuario_Id INT NOT NULL CONSTRAINT Fk_UsuarioProyecto_Id FOREIGN KEY REFERENCES Usuario(Usuario_Id),
	Cliente_Id INT NOT NULL CONSTRAINT Fk_ClienteProyecto_Id FOREIGN KEY REFERENCES Cliente(Cliente_Id),
	NombreProyecto VARCHAR(max) NOT NULL,
	Descripcion VARCHAR(max) NOT NULL,
	FechaInicio datetime,
	FechaFinalizacion datetime,
	FechaCreacion DATETIME DEFAULT GETDATE()
);
GO

CREATE TABLE RequerimientosCliente
(
	Requerimiento_Id int not null identity constraint Pk_RequerimientoCliente_Id primary key (Requerimiento_Id),
	Proyecto_Id int not null constraint Fk_ProyectoRequerimiento_Id foreign key references Proyecto (Proyecto_Id),
	TipoRequerimiento varchar (50),
	Descripcion varchar (max),
	FechaCreacion DATETIME DEFAULT GETDATE()
);
GO

CREATE TABLE HistorialProyecto
(
	HistorialProyecto_Id int not null identity constraint Pk_HistorialProyecto_Id primary key (HistorialProyecto_Id),
	Proyecto_Id int not null constraint Fk_HistorialProyecto_Id foreign key references Proyecto (Proyecto_Id),
	Usuario_Id int not null constraint Fk_HistorialUsurario_Id foreign key references Usuario (Usuario_Id),
	FechaCambio Datetime,
	AccionRealizada varchar (50),
	Descripcion varchar (max)
);
GO

CREATE TABLE TipoComponente
(
	TipoComponente_Id int not null identity constraint Pk_TipoComponente_Id primary key (TipoComponente_Id),
	NombreComponente varchar (100)
);
GO

CREATE TABLE Estimacion(

	Estimacion_Id int not null identity constraint Pk_Estimacion_Id primary key (Estimacion_Id),
	Proyecto_Id int not null constraint Fk_ProyectoEstimacion_Id foreign key references Proyecto (Proyecto_Id),
	Productividad_Id int not null constraint Fk_ProductividadEstimacion_Id foreign key references ProductividadPuntoFuncion (Productividad_Id),
	FactorAjuste decimal (10,2),
	TotalPuntoFuncionAjustado decimal (10,2),
	TotalPuntoFuncionSinAjustar decimal (10,2)
);
GO

CREATE TABLE Detalle_estimacion(
   Detalle_estimacion_id INT NOT NULL IDENTITY CONSTRAINT FK_Detalle_Estimacion_Id PRIMARY KEY(Detalle_estimacion_id),
   Estimacion_Id INT NOT NULL CONSTRAINT Fk_Estimacion_DetalleEstimacion FOREIGN KEY REFERENCES Estimacion(Estimacion_Id),
   Esfuerzo_total DECIMAL(10,2) NOT NULL,
   Duracion_horas DECIMAL(10,2) NOT NULL,
   Duracion_dias INT NOT NULL,
   Duracion_mes INT NOT NULL,
   Costo_bruto_estimado DECIMAL(10,2) NOT NULL,
   Costo_total DECIMAL(10,2) NOT NULL
);
GO

CREATE TABLE Caracteristica_sistema(
    Caracteristica_sistema_id INT NOT NULL IDENTITY CONSTRAINT PK_caracteristica_sistema_Id PRIMARY KEY(Caracteristica_sistema_id),
    Estimacion_Id INT NOT NULL CONSTRAINT Fk_estimacion_id_caracteristica_sistema FOREIGN KEY REFERENCES Estimacion(Estimacion_Id),
    Caracteristica VARCHAR(MAX) NOT NULL,
    Puntaje INT NOT NULL
);
GO

CREATE TABLE Parametros_economico(
Parametro_economico_id INT NOT NULL IDENTITY CONSTRAINT Pk_parametros_economicos_id PRIMARY KEY(Parametro_economico_id),
Estimacion_Id INT NOT NULL CONSTRAINT Fk_estimacion_id_parametros_economico FOREIGN KEY REFERENCES Estimacion(Estimacion_Id),
Nombre_parametro VARCHAR(100) NOT NULL,
Valor_parametro DECIMAL(10,2) NOT NULL,
Fecha_creacion DATETIME DEFAULT GETDATE()

);
GO

CREATE TABLE Participante_estimacion(
Participante_estimacion_id INT NOT NULL IDENTITY CONSTRAINT PK_participante_estimacion_id PRIMARY KEY(Participante_estimacion_id ),
Cargo_id INT NOT NULL CONSTRAINT Fk_cargo_id_participante_estimacion FOREIGN KEY REFERENCES cargo(Cargo_Id),
Estimacion_Id INT NOT NULL CONSTRAINT Fk_estimacion_id_participante_estimacion FOREIGN KEY REFERENCES Estimacion(Estimacion_Id),
Cantidad_persona INT NOT NULL
);
GO

CREATE TABLE Componente_funcionales(
Componente_funcionales_id INT NOT NULL IDENTITY CONSTRAINT Pk_Conponente_funcionales_Id PRIMARY KEY(Componente_funcionales_id),
Estimacion_Id INT NOT NULL CONSTRAINT Fk_estimacion_id_componente_funcionales FOREIGN KEY REFERENCES Estimacion(Estimacion_Id),
Requerimiento_id INT NOT NULL CONSTRAINT Fk_requerimiento_id_componente_funcionales FOREIGN KEY REFERENCES RequerimientosCliente(Requerimiento_Id),
Tipo_componente_id INT NOT NULL CONSTRAINT Fk_tipo_componente_componente_funcional FOREIGN KEY REFERENCES TipoComponente(TipoComponente_Id),
complejidad VARCHAR(8) NOT NULL
);
GO

CREATE TABLE Conteo_tipo_componente(
Conteo_componente_id INT NOT NULL IDENTITY CONSTRAINT Pk_conteo_tipo_componente PRIMARY KEY(Conteo_componente_id),
Tipo_conponente_id INT NOT NULL CONSTRAINT Fk_tipo_componente_conteo_componente FOREIGN KEY REFERENCES TipoComponente(TipoComponente_Id),
Estimacion_id INT NOT NULL CONSTRAINT Fk_estimacion_id_conteo_componente FOREIGN KEY REFERENCES Estimacion(Estimacion_Id),
baja INT NOT NULL,
media INT NOT NULL,
alta INT NOT NULL
);
GO

CREATE TABLE Punto_funcion_ajustado(
Punto_funcion_ajustado_id INT NOT NULL IDENTITY CONSTRAINT Pk_punto_funcion_ajustado PRIMARY KEY(Punto_funcion_ajustado_id),
Tipo_conponente_id INT NOT NULL CONSTRAINT Fk_tipo_componente_punto_funcion_ajustado FOREIGN KEY REFERENCES TipoComponente(TipoComponente_Id),
Estimacion_id INT NOT NULL CONSTRAINT Fk_estimacion_id_punto_funcion_ajustado FOREIGN KEY REFERENCES Estimacion(Estimacion_Id),
baja INT NOT NULL,
media INT NOT NULL,
alta INT NOT NULL
);
GO
