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

INSERT INTO Estado_Usuario_Empleado
    (Estado)
VALUES
    ('Activo');
GO
INSERT INTO Estado_Usuario_Empleado
    (Estado)
VALUES
    ('Inactivo');
GO

CREATE TABlE Estado_Estimacion
(
    Estado_Id INT NOT NULL IDENTITY CONSTRAINT Pk_Estado_Estimacion PRIMARY KEY(Estado_Id),
    Estado VARCHAR(15) NOT NULL
);
GO

-- Insert datos en estado_estimacion
INSERT INTO Estado_Estimacion
    (Estado)
VALUES
    ('Completada'),
    ('Sin efecto'),
    ('Aprobada')
GO

CREATE TABLE Cargo
(
    Cargo_Id INT NOT NULL IDENTITY CONSTRAINT Pk_cargo_Id PRIMARY KEY(Cargo_Id),
    NombreCargo VARCHAR(100) NOT NULL,
	SalarioHora decimal(10,2) not null,
    Descripcion VARCHAR(max) NOT NULL,
	Creado_por VARCHAR(25) NULL,
	Fecha_Creacion DATETIME DEFAULT GETDATE()

);
GO

INSERT INTO  Cargo
    (Nombre,SalarioHora,Descripcion)
VALUES
    ('Frontend Development Junior', 10,'Programador que trabaja la parte de la
aplicacionn  con la que interactua el usuario');
GO

INSERT INTO  Cargo
    (Nombre,SalarioHora,Descripcion)
VALUES
    ('Frontend Development Mid Senior', 25,'Programador que trabaja la parte de la
aplicacionn  con la que interactua el usuario');
GO

INSERT INTO  Cargo
    (Nombre,SalarioHora,Descripcion)
VALUES
    ('Frontend Development Senior', 45,'Programador que trabaja la parte de la
aplicacionn  con la que interactua el usuario');
GO

INSERT INTO cargo
    (Nombre,SalarioHora,Descripcion)
VALUES
    ('Backend Development Junior', 10,'Programador que se encarga de trabajar
con la parte de la aplicacion que el usuario no puede ver');
GO

INSERT INTO cargo
    (Nombre,SalarioHora,Descripcion)
VALUES
    ('Backend Development Mid Senior', 25,'Programador que se encarga de trabajar
con la parte de la aplicacion que el usuario no puede ver');
GO

INSERT INTO cargo
    (Nombre,SalarioHora,Descripcion)
VALUES
    ('Backend Development Senior', 40,'Programador que se encarga de trabajar
con la parte de la aplicacion que el usuario no puede ver');
GO


INSERT INTO cargo
    (Nombre,SalarioHora,Descripcion)
VALUES
    ('Full-Stacks Development Junior',18, 'Programador que trabaja todos los 
aspectos de una aplicación, incluidos Frontend y backend');
GO

INSERT INTO cargo
    (Nombre,SalarioHora,Descripcion)
VALUES
    ('Full-Stacks Development Mid Senior',35, 'Programador que trabaja todos los 
aspectos de una aplicación, incluidos Frontend y backend');
GO

INSERT INTO cargo
    (Nombre,SalarioHora,Descripcion)
VALUES
    ('Full-Stacks Development Senior',90, 'Programador que trabaja todos los 
aspectos de una aplicación, incluidos Frontend y backend');
GO

INSERT INTO cargo
    (Nombre,SalarioHora,Descripcion)
VALUES
    ('Mobile Development Junior', 12,'Programador que trabaja las aplicaciones 
Moviles');
GO

INSERT INTO cargo
    (Nombre,SalarioHora,Descripcion)
VALUES
    ('Mobile Development Mid Senior', 40,'Programador que trabaja las aplicaciones 
Moviles');
GO

INSERT INTO cargo
    (Nombre,SalarioHora,Descripcion)
VALUES
    ('Mobile Development Senior', 70,'Programador que trabaja las aplicaciones 
Moviles');
GO

INSERT INTO cargo
    (Nombre,SalarioHora,Descripcion)
VALUES
    ('Diseñador UX Junior',25, 'Es el profesional que gestiona la experiencia del usuario 
con un producto digital. Su objetivo es que la interacción del usuario con el producto sea sencilla e intuitiva');
GO

INSERT INTO cargo
    (Nombre,SalarioHora,Descripcion)
VALUES
    ('Diseñador UX Mid Senior',35, 'Es el profesional que gestiona la experiencia del usuario 
con un producto digital. Su objetivo es que la interacción del usuario con el producto sea sencilla e intuitiva');
GO

INSERT INTO cargo
    (Nombre,SalarioHora,Descripcion)
VALUES
    ('Diseñador UX Senior',50, 'Es el profesional que gestiona la experiencia del usuario 
con un producto digital. Su objetivo es que la interacción del usuario con el producto sea sencilla e intuitiva');
GO

INSERT INTO cargo
    (Nombre,SalarioHora,Descripcion)
VALUES
    ('Director General', 0, 'N/A');
GO

INSERT INTO cargo
    (Nombre,SalarioHora,Descripcion)
VALUES
    ('Product Owner', 0,'N/A');
GO

INSERT INTO cargo
    (Nombre,SalarioHora,Descripcion)
VALUES
    ('Administrador de tecnología', 0, 'N/A');
GO


CREATE TABLE Empleado
(
    Empleado_Id INT NOT NULL IDENTITY(1,1) CONSTRAINT Pk_empleadoId PRIMARY KEY(empleado_Id),
    Estado_Id INT NOT NULL DEFAULT 1 CONSTRAINT FK_Estado_UsuarioEmpleado FOREIGN KEY REFERENCES Estado_Usuario_Empleado(Estado_Id),
    Cargo_Id INT NOT NULL CONSTRAINT Fk_Cargo_Empleado FOREIGN KEY REFERENCES Cargo(Cargo_Id),
    Creado_por VARCHAR(25) NULL,
    Nombre VARCHAR(25) NOT NULL,
    Apellido VARCHAR(25) NOT NULL,
    Identificacion VARCHAR(15) NOT NULL,
    Fecha_Nacimiento DATETIME NOT NULL,
    Email VARCHAR(255) NOT NULL,
    Telefono_Residencial VARCHAR(15) NULL,
    Celular VARCHAR(15) NOT NULL,
    Pais VARCHAR(255) NOT NULL,
    Estado VARCHAR(255) NOT NULL,
    Ciudad VARCHAR(255) NOT NULL,
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

INSERT INTO Rol
    (Nombre)
VALUES
    ('Gerente de TIC');
GO
INSERT INTO Rol
    (Nombre)
VALUES
    ('Encargado de proyectos');
GO
INSERT INTO Rol
    (Nombre)
VALUES
    ('Gerente general');
GO

CREATE TABLE Usuario
(
    Usuario_Id INT NOT NULL IDENTITY CONSTRAINT Pk_Usuario PRIMARY KEY (Usuario_Id),
    Empleado_Id INT NOT NULL CONSTRAINT Fk_Empleado_UsuarioId FOREIGN KEY REFERENCES Empleado(Empleado_Id),
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


INSERT INTO TipoCliente
    (NombreTipo_Cliente)
VALUES
    ('Persona Fisica');
GO
INSERT INTO TipoCliente
    (NombreTipo_Cliente)
VALUES
    ('Empresarial');
GO
INSERT INTO TipoCliente
    (NombreTipo_Cliente)
VALUES
    ('Gubernamental');
GO
INSERT INTO TipoCliente
    (NombreTipo_Cliente)
VALUES
    ('Sin requisito fiscal'); 
GO

create TABLE Cliente
(
    Cliente_Id INT NOT NULL IDENTITY CONSTRAINT Pk_Cliente Primary key (Cliente_Id),
    Tipo_Id INT NOT NULL CONSTRAINT Fk_TipoClienteId FOREIGN KEY REFERENCES TipoCliente (Tipo_Id),
    Creado_por VARCHAR(25) NULL,
    Nombre_Cliente VARCHAR(255) NOT NULL,
    Tipo_identificacion VARCHAR(255) NOT NULL,
    Identificacion VARCHAR(15) NOT NULL,
    Email VARCHAR(255) NOT NULL,
    Telefono_Residencial VARCHAR(15) NULL,
    Celular VARCHAR(15) NOT NULL,
    Pais VARCHAR(255) NOT NULL,
    Estado VARCHAR(255) NULL,
    Ciudad VARCHAR(255) NULL,
    Direccion VARCHAR(255) NOT NULL,
    Fecha_Creacion DATETIME DEFAULT GETDATE()

);
GO

CREATE TABLE TarifarioHora
(
    Tarifario_Id int not null identity constraint Pk_TarifarioId primary key (Tarifario_Id),
    Cargo_Id INT NOT NULL CONSTRAINT Fk_Cargo_Usuario FOREIGN KEY REFERENCES Cargo(Cargo_Id),
    Empleado_Id INT NOT NULL CONSTRAINT Fk_EmpleadoTarifario_Id FOREIGN KEY REFERENCES Empleado(Empleado_Id),
    Usuario_Id INT NOT NULL CONSTRAINT Fk_Usuario_Id FOREIGN KEY REFERENCES Usuario(Usuario_Id),
    MontoTarifa money not null,
    Fecha_Creacion DATETIME DEFAULT GETDATE()
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
INSERT INTO EstadoProyecto
    (Nombre_EstadoProyecto)
VALUES
    ('Registro inicial del proyecto'),
    ('Identificación de las funciones del proyecto'),
    ('Análisis de la complejidad del proyecto'),
    ('Cálculo de los puntos de función totales'),
    ('Revisión y validación de la estimación'),
    ('Aprobación final de la estimación')
GO
CREATE TABLE Proyecto
(
    Proyecto_Id INT NOT NULL IDENTITY CONSTRAINT Pk_ProyectoId Primary key (Proyecto_Id),
    EstadoProyecto_Id INT NOT NULL DEFAULT 1 CONSTRAINT Fk_Estado_Proyecto_Id FOREIGN KEY REFERENCES EstadoProyecto(EstadoProyecto_Id),
    Usuario_Id INT NOT NULL CONSTRAINT Fk_Usuario_Proyecto_Id FOREIGN KEY REFERENCES Usuario(Usuario_Id),
    Cliente_Id INT NOT NULL CONSTRAINT Fk_ClienteP_royecto_Id FOREIGN KEY REFERENCES Cliente(Cliente_Id),
    NombreProyecto VARCHAR(max) NOT NULL,
    Descripcion VARCHAR(max) NULL,
    TipoProyecto VARCHAR(Max) NOT NULL,
    TipoAplicacion VARCHAR(Max) NOT NULL,
    --FechaInicio datetime,
    --FechaFinalizacion datetime,
    FechaCreacion DATETIME DEFAULT GETDATE()
);
GO

CREATE TABLE TipoRequerimiento
(
    tipoRequerimiento_Id int not null identity constraint Pk_TipoRequerimiento_Id primary key (tipoRequerimiento_Id),
    nombre varchar (50),
);
GO

INSERT INTO TipoRequerimiento
    (nombre)
VALUES
    ('Requisitos Funcionales'),
    ('Requisitos No Funcionales'),
    ('Requisitos Futuros'),
    ('Requisitos de Software Funcionales')
GO

CREATE TABLE EstadoRequerimiento
(
    EstadoRequerimientoId int not null identity constraint Pk_EstadoRequerimientoId primary key(EstadoRequerimientoId),
    NombreEstadoRequerimiento VARCHAR(50)
);
GO

INSERT INTO EstadoRequerimiento
    (NombreEstadoRequerimiento)
VALUES
    ('En revisión'),
    ('Aprobado'),
    ('Rechazado');
GO

CREATE TABLE RequerimientosCliente
(
    Requerimiento_Id int not null identity constraint Pk_RequerimientoCliente_Id primary key (Requerimiento_Id),
    Proyecto_Id int not null constraint Fk_ProyectoRequerimiento_Id foreign key references Proyecto (Proyecto_Id),
    Usuario_Id int not null constraint Fk_UsurarioCreadorRquerimientos_Id foreign key references Usuario(Usuario_Id),
    Estado_Id int DEFAULT 2 not null constraint Fk_EstadoRequerimiento_Id foreign key references EstadoRequerimiento(EstadoRequerimientoId),
    TipoRequerimiento_Id INT NOT NULL CONSTRAINT Fk_requerimiento_tipo_Id FOREIGN key REFERENCES TipoRequerimiento(tipoRequerimiento_Id),
    Requisito VARCHAR(max) NOT NULL,
    FechaCreacion DATETIME DEFAULT GETDATE()
);
GO

CREATE TABLE RequerimientosSoftware
(
    Id int not null identity constraint Pk_RequerimientoSoftware_Id primary key (Id),
    Requerimientos_Cliente_Id int not null constraint Fk_RequerimientoCliente_requisitoSW_Id foreign key references RequerimientosCliente(Requerimiento_Id),
    Estado_Id int DEFAULT 1 not null constraint Fk_EstadoRequerimientoSw_Id foreign key references EstadoRequerimiento(EstadoRequerimientoId),
    Requerimiento_Sf VARCHAR(max) NOT NULL,
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

INSERT INTO TipoComponente
    (NombreComponente)
VALUES
    ('Entradas Externas'),
    ('Salidas Externas'),
    ('Consultas Externas'),
    ('Archivos Lógicos Internos'),
    ('Interfaces Externas');
GO

CREATE TABLE Estimacion
(

    Estimacion_Id int not null identity constraint Pk_Estimacion_Id primary key (Estimacion_Id),
    Proyecto_Id int not null constraint Fk_ProyectoEstimacion_Id foreign key references Proyecto (Proyecto_Id),
    Estado_Id int not null constraint Fk_Estado_Id_Estimacion foreign key references Estado_Estimacion(Estado_Id),
    -- Productividad_Id int not null constraint Fk_ProductividadEstimacion_Id foreign key references ProductividadPuntoFuncion (Productividad_Id),
    FactorAjuste decimal (10,2),
    TotalPuntoFuncionAjustado decimal (10,2),
    TotalPuntoFuncionSinAjustar decimal (10,2),
    FechaCreacion DATETIME DEFAULT GETDATE()

);
GO

CREATE TABLE Estimacion_Productividad
(
    Estimacion_Productividad_Id INT NOT NULL IDENTITY CONSTRAINT  PK_Estimacion_Productividad primary key (Estimacion_Productividad_Id),
    Estimacion_Id iNT NOT NULL CONSTRAINT Fk_EstimacionId_productividad foreign key references Estimacion(Estimacion_Id),
    Productividad_Id INT NOT NULL CONSTRAINT Fk_ProductividadId_estimacion foreign key references ProductividadPuntoFuncion(Productividad_Id),
    EsfuerzoProductividad DECIMAL(10,2) NOT NULL,
    ProgramadoresProductividad INT NOT NULL
);
GO


CREATE TABLE Detalle_estimacion
(
    Detalle_estimacion_id INT NOT NULL IDENTITY CONSTRAINT FK_Detalle_Estimacion_Id PRIMARY KEY(Detalle_estimacion_id),
    Estimacion_Id INT NOT NULL CONSTRAINT Fk_Estimacion_DetalleEstimacion FOREIGN KEY REFERENCES Estimacion(Estimacion_Id),
    Esfuerzo_total DECIMAL(10,2) NOT NULL,
    Duracion_horas DECIMAL(10,2) NOT NULL,
    Duracion_dias DECIMAL(10,2) NOT NULL,
    Duracion_mes DECIMAL(10,2) NOT NULL,
    Costo_bruto_estimado DECIMAL(10,2) NOT NULL,
    Costo_total DECIMAL(10,2) NOT NULL
);
GO



/*CREATE TABLE Caracteristica_puntoFuncion
(
    idCaracteristica INT NOT NULL IDENTITY CONSTRAINT PK_caracteristica_puntoFuncion_Id PRIMARY KEY(idCaracteristica),
    caracteristicaDescripcion VARCHAR NOT NULL
);
GO*/
CREATE TABLE Puntaje_Caracteristica
(
    idPuntaje INT NOT NULL IDENTITY CONSTRAINT PK_Puntaje_Id PRIMARY KEY(idPuntaje),
    valor INT NOT NULL,
    significado VARCHAR(Max) NOT NULL
);
GO

INSERT INTO Puntaje_Caracteristica
    (valor, significado)
VALUES
    (0, 'Sin influencia'),
    (1, 'Incidental'),
    (2, 'Moderado'),
    (3, 'Medio'),
    (4, 'Significativo'),
    (5, 'Esencial');
GO

CREATE TABLE Caracteristica_sistema
(
    Caracteristica_sistema_id INT NOT NULL IDENTITY CONSTRAINT PK_caracteristica_sistema_Id PRIMARY KEY(Caracteristica_sistema_id),
    Proyecto_Id INT NOT NULL CONSTRAINT Fk_proyecto_id_caracteristica_sistema FOREIGN KEY REFERENCES Proyecto(Proyecto_Id),
    Caracteristica VARCHAR(MAX) NOT NULL,
    Idpuntaje INT NOT NULL CONSTRAINT FK_puntaje_caracteristica FOREIGN KEY REFERENCES Puntaje_Caracteristica(idPuntaje)
);
GO
--EXEC sp_RENAME 'Caracteristica_sistema.puntaje', 'Idpuntaje', 'COLUMN'


CREATE TABLE Parametros_economico
(
    Parametro_economico_id INT NOT NULL IDENTITY CONSTRAINT Pk_parametros_economicos_id PRIMARY KEY(Parametro_economico_id),
    Estimacion_Id INT NOT NULL CONSTRAINT Fk_estimacion_id_parametros_economico FOREIGN KEY REFERENCES Estimacion(Estimacion_Id),
    Nombre_parametro VARCHAR(100) NOT NULL,
    Valor_parametro DECIMAL(10,2) NOT NULL,
    Fecha_creacion DATETIME DEFAULT GETDATE()

);
GO

CREATE TABLE Participante_estimacion
(
    Participante_estimacion_id INT NOT NULL IDENTITY CONSTRAINT PK_participante_estimacion_id PRIMARY KEY(Participante_estimacion_id ),
    Cargo_id INT NOT NULL CONSTRAINT Fk_cargo_id_participante_estimacion FOREIGN KEY REFERENCES cargo(Cargo_Id),
    Estimacion_Id INT NOT NULL CONSTRAINT Fk_estimacion_id_participante_estimacion FOREIGN KEY REFERENCES Estimacion(Estimacion_Id),
    Cantidad_persona INT NOT NULL
);
GO

CREATE TABLE Componente_funcionales
(
    Componente_funcionales_id INT NOT NULL IDENTITY CONSTRAINT Pk_Conponente_funcionales_Id PRIMARY KEY(Componente_funcionales_id),
    Usuario_Id int not null constraint Fk_ComponenteFuncional_Usurario_Id foreign key references Usuario(Usuario_Id),
    Proyecto_Id INT NOT NULL CONSTRAINT Fk_proyecto_id_componente_funcionales FOREIGN KEY REFERENCES Proyecto(Proyecto_Id),
    RequerimientoSW_id INT NOT NULL CONSTRAINT Fk_requerimientoSW_id_componente_funcionales FOREIGN KEY REFERENCES RequerimientosSoftware(Id),
    Tipo_componente_id INT NOT NULL CONSTRAINT Fk_tipo_componente_componente_funcional FOREIGN KEY REFERENCES TipoComponente(TipoComponente_Id),
    complejidad VARCHAR(8) NOT NULL
);
GO

CREATE TABLE Conteo_tipo_componente
(
    Conteo_componente_id INT NOT NULL IDENTITY CONSTRAINT Pk_conteo_tipo_componente PRIMARY KEY(Conteo_componente_id),
    Tipo_componente_id INT NOT NULL CONSTRAINT Fk_tipo_componente_conteo_componente FOREIGN KEY REFERENCES TipoComponente(TipoComponente_Id),
    Proyecto_id INT NOT NULL CONSTRAINT Fk_proyecto_id_conteo_componente FOREIGN KEY REFERENCES Proyecto(Proyecto_Id),
    baja INT NOT NULL,
    media INT NOT NULL,
    alta INT NOT NULL
);
GO

CREATE TABLE Punto_funcion_ajustado
(
    Punto_funcion_ajustado_id INT NOT NULL IDENTITY CONSTRAINT Pk_punto_funcion_ajustado PRIMARY KEY(Punto_funcion_ajustado_id),
    Tipo_componente_id INT NOT NULL CONSTRAINT Fk_tipo_componente_punto_funcion_ajustado FOREIGN KEY REFERENCES TipoComponente(TipoComponente_Id),
    Proyecto_id INT NOT NULL CONSTRAINT Fk_Proyecto_id_punto_funcion_ajustado FOREIGN KEY REFERENCES Proyecto(Proyecto_Id),
    baja INT NOT NULL,
    media INT NOT NULL,
    alta INT NOT NULL,
    total INT NOT NULL
    --total AS ISNULL(baja,0)+ISNULL(media,0)+ISNULL(alta,0) PERSISTED
);
GO

--DBCC CHECKIDENT (Cargo, RESEED, 0)