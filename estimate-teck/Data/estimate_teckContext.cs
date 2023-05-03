using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using estimate_teck.Models;

namespace estimate_teck.Data
{
    public partial class estimate_teckContext : DbContext
    {
        public estimate_teckContext()
        {
        }

        public estimate_teckContext(DbContextOptions<estimate_teckContext> options)
            : base(options)
        {
        }

        public virtual DbSet<CaracteristicaSistema> CaracteristicaSistemas { get; set; } = null!;
        public virtual DbSet<Cargo> Cargos { get; set; } = null!;
        public virtual DbSet<Cliente> Clientes { get; set; } = null!;
        public virtual DbSet<ComponenteFuncionale> ComponenteFuncionales { get; set; } = null!;
        public virtual DbSet<ConteoTipoComponente> ConteoTipoComponentes { get; set; } = null!;
        public virtual DbSet<DetalleEstimacion> DetalleEstimacions { get; set; } = null!;
        public virtual DbSet<Empleado> Empleados { get; set; } = null!;
        public virtual DbSet<EstadoEstimacion> EstadoEstimacions { get; set; } = null!;
        public virtual DbSet<EstadoProyecto> EstadoProyectos { get; set; } = null!;
        public virtual DbSet<EstadoRequerimiento> EstadoRequerimientos { get; set; } = null!;
        public virtual DbSet<EstadoUsuarioEmpleado> EstadoUsuarioEmpleados { get; set; } = null!;
        public virtual DbSet<Estimacion> Estimacions { get; set; } = null!;
        public virtual DbSet<EstimacionProductividad> EstimacionProductividads { get; set; } = null!;
        public virtual DbSet<HistorialProyecto> HistorialProyectos { get; set; } = null!;
        public virtual DbSet<ParametrosEconomico> ParametrosEconomicos { get; set; } = null!;
        public virtual DbSet<ParticipanteEstimacion> ParticipanteEstimacions { get; set; } = null!;
        public virtual DbSet<ProductividadPuntoFuncion> ProductividadPuntoFuncions { get; set; } = null!;
        public virtual DbSet<Proyecto> Proyectos { get; set; } = null!;
        public virtual DbSet<PuntajeCaracteristica> PuntajeCaracteristicas { get; set; } = null!;
        public virtual DbSet<PuntoFuncionAjustado> PuntoFuncionAjustados { get; set; } = null!;
        public virtual DbSet<RequerimientosCliente> RequerimientosClientes { get; set; } = null!;
        public virtual DbSet<RequerimientosSoftware> RequerimientosSoftwares { get; set; } = null!;
        public virtual DbSet<Rol> Rols { get; set; } = null!;
        public virtual DbSet<TarifarioHora> TarifarioHoras { get; set; } = null!;
        public virtual DbSet<TipoCliente> TipoClientes { get; set; } = null!;
        public virtual DbSet<TipoComponente> TipoComponentes { get; set; } = null!;
        public virtual DbSet<TipoRequerimiento> TipoRequerimientos { get; set; } = null!;
        public virtual DbSet<Usuario> Usuarios { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Data source=localhost; Initial catalog=estimate_teck; User Id=sa; password=admin123@");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CaracteristicaSistema>(entity =>
            {
                entity.ToTable("Caracteristica_sistema");

                entity.Property(e => e.CaracteristicaSistemaId).HasColumnName("Caracteristica_sistema_id");

                entity.Property(e => e.Caracteristica).IsUnicode(false);

                entity.Property(e => e.ProyectoId).HasColumnName("Proyecto_Id");

                entity.HasOne(d => d.IdpuntajeNavigation)
                    .WithMany(p => p.CaracteristicaSistemas)
                    .HasForeignKey(d => d.Idpuntaje)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_puntaje_caracteristica");

                entity.HasOne(d => d.Proyecto)
                    .WithMany(p => p.CaracteristicaSistemas)
                    .HasForeignKey(d => d.ProyectoId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Fk_proyecto_id_caracteristica_sistema");
            });

            modelBuilder.Entity<Cargo>(entity =>
            {
                entity.ToTable("Cargo");

                entity.Property(e => e.CargoId).HasColumnName("Cargo_Id");

                entity.Property(e => e.CreadoPor)
                    .HasMaxLength(25)
                    .IsUnicode(false)
                    .HasColumnName("Creado_por");

                entity.Property(e => e.Descripcion).IsUnicode(false);

                entity.Property(e => e.FechaCreacion)
                    .HasColumnType("datetime")
                    .HasColumnName("Fecha_Creacion")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.NombreCargo)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.SalarioHora).HasColumnType("decimal(10, 2)");
            });

            modelBuilder.Entity<Cliente>(entity =>
            {
                entity.ToTable("Cliente");

                entity.Property(e => e.ClienteId).HasColumnName("Cliente_Id");

                entity.Property(e => e.Celular)
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.Ciudad)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.CreadoPor)
                    .HasMaxLength(25)
                    .IsUnicode(false)
                    .HasColumnName("Creado_por");

                entity.Property(e => e.Direccion)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Email)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Estado)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.FechaCreacion)
                    .HasColumnType("datetime")
                    .HasColumnName("Fecha_Creacion")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Identificacion)
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.NombreCliente)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("Nombre_Cliente");

                entity.Property(e => e.Pais)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.TelefonoResidencial)
                    .HasMaxLength(15)
                    .IsUnicode(false)
                    .HasColumnName("Telefono_Residencial");

                entity.Property(e => e.TipoId).HasColumnName("Tipo_Id");

                entity.Property(e => e.TipoIdentificacion)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("Tipo_identificacion");

                entity.HasOne(d => d.Tipo)
                    .WithMany(p => p.Clientes)
                    .HasForeignKey(d => d.TipoId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Fk_TipoClienteId");
            });

            modelBuilder.Entity<ComponenteFuncionale>(entity =>
            {
                entity.HasKey(e => e.ComponenteFuncionalesId)
                    .HasName("Pk_Conponente_funcionales_Id");

                entity.ToTable("Componente_funcionales");

                entity.Property(e => e.ComponenteFuncionalesId).HasColumnName("Componente_funcionales_id");

                entity.Property(e => e.Complejidad)
                    .HasMaxLength(8)
                    .IsUnicode(false)
                    .HasColumnName("complejidad");

                entity.Property(e => e.ProyectoId).HasColumnName("Proyecto_Id");

                entity.Property(e => e.RequerimientoSwId).HasColumnName("RequerimientoSW_id");

                entity.Property(e => e.TipoComponenteId).HasColumnName("Tipo_componente_id");

                entity.Property(e => e.UsuarioId).HasColumnName("Usuario_Id");

                entity.HasOne(d => d.Proyecto)
                    .WithMany(p => p.ComponenteFuncionales)
                    .HasForeignKey(d => d.ProyectoId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Fk_proyecto_id_componente_funcionales");

                entity.HasOne(d => d.RequerimientoSw)
                    .WithMany(p => p.ComponenteFuncionales)
                    .HasForeignKey(d => d.RequerimientoSwId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Fk_requerimientoSW_id_componente_funcionales");

                entity.HasOne(d => d.TipoComponente)
                    .WithMany(p => p.ComponenteFuncionales)
                    .HasForeignKey(d => d.TipoComponenteId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Fk_tipo_componente_componente_funcional");

                entity.HasOne(d => d.Usuario)
                    .WithMany(p => p.ComponenteFuncionales)
                    .HasForeignKey(d => d.UsuarioId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Fk_ComponenteFuncional_Usurario_Id");
            });

            modelBuilder.Entity<ConteoTipoComponente>(entity =>
            {
                entity.HasKey(e => e.ConteoComponenteId)
                    .HasName("Pk_conteo_tipo_componente");

                entity.ToTable("Conteo_tipo_componente");

                entity.Property(e => e.ConteoComponenteId).HasColumnName("Conteo_componente_id");

                entity.Property(e => e.Alta).HasColumnName("alta");

                entity.Property(e => e.Baja).HasColumnName("baja");

                entity.Property(e => e.Media).HasColumnName("media");

                entity.Property(e => e.ProyectoId).HasColumnName("Proyecto_id");

                entity.Property(e => e.TipoComponenteId).HasColumnName("Tipo_componente_id");

                entity.HasOne(d => d.Proyecto)
                    .WithMany(p => p.ConteoTipoComponentes)
                    .HasForeignKey(d => d.ProyectoId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Fk_proyecto_id_conteo_componente");

                entity.HasOne(d => d.TipoComponente)
                    .WithMany(p => p.ConteoTipoComponentes)
                    .HasForeignKey(d => d.TipoComponenteId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Fk_tipo_componente_conteo_componente");
            });

            modelBuilder.Entity<DetalleEstimacion>(entity =>
            {
                entity.ToTable("Detalle_estimacion");

                entity.Property(e => e.DetalleEstimacionId).HasColumnName("Detalle_estimacion_id");

                entity.Property(e => e.CostoBrutoEstimado)
                    .HasColumnType("decimal(10, 2)")
                    .HasColumnName("Costo_bruto_estimado");

                entity.Property(e => e.CostoTotal)
                    .HasColumnType("decimal(10, 2)")
                    .HasColumnName("Costo_total");

                entity.Property(e => e.DuracionDias)
                    .HasColumnType("decimal(10, 2)")
                    .HasColumnName("Duracion_dias");

                entity.Property(e => e.DuracionHoras)
                    .HasColumnType("decimal(10, 2)")
                    .HasColumnName("Duracion_horas");

                entity.Property(e => e.DuracionMes)
                    .HasColumnType("decimal(10, 2)")
                    .HasColumnName("Duracion_mes");

                entity.Property(e => e.EsfuerzoTotal)
                    .HasColumnType("decimal(10, 2)")
                    .HasColumnName("Esfuerzo_total");

                entity.Property(e => e.EstimacionId).HasColumnName("Estimacion_Id");

                entity.Property(e => e.TotalProgramadores).HasColumnName("Total_programadores");

                entity.HasOne(d => d.Estimacion)
                    .WithMany(p => p.DetalleEstimacions)
                    .HasForeignKey(d => d.EstimacionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Fk_Estimacion_DetalleEstimacion");
            });

            modelBuilder.Entity<Empleado>(entity =>
            {
                entity.ToTable("Empleado");

                entity.Property(e => e.EmpleadoId).HasColumnName("Empleado_Id");

                entity.Property(e => e.Apellido)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.CargoId).HasColumnName("Cargo_Id");

                entity.Property(e => e.Celular)
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.Ciudad)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.CreadoPor)
                    .HasMaxLength(25)
                    .IsUnicode(false)
                    .HasColumnName("Creado_por");

                entity.Property(e => e.Direccion)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Email)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Estado)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.EstadoId)
                    .HasColumnName("Estado_Id")
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.FechaCreacion)
                    .HasColumnType("datetime")
                    .HasColumnName("Fecha_Creacion")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.FechaNacimiento)
                    .HasColumnType("datetime")
                    .HasColumnName("Fecha_Nacimiento");

                entity.Property(e => e.Identificacion)
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.Nombre)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.Pais)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.TelefonoResidencial)
                    .HasMaxLength(15)
                    .IsUnicode(false)
                    .HasColumnName("Telefono_Residencial");

                entity.HasOne(d => d.Cargo)
                    .WithMany(p => p.Empleados)
                    .HasForeignKey(d => d.CargoId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Fk_Cargo_Empleado");

                entity.HasOne(d => d.EstadoNavigation)
                    .WithMany(p => p.Empleados)
                    .HasForeignKey(d => d.EstadoId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Estado_UsuarioEmpleado");
            });

            modelBuilder.Entity<EstadoEstimacion>(entity =>
            {
                entity.HasKey(e => e.EstadoId)
                    .HasName("Pk_Estado_Estimacion");

                entity.ToTable("Estado_Estimacion");

                entity.Property(e => e.EstadoId).HasColumnName("Estado_Id");

                entity.Property(e => e.Estado)
                    .HasMaxLength(15)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<EstadoProyecto>(entity =>
            {
                entity.ToTable("EstadoProyecto");

                entity.Property(e => e.EstadoProyectoId).HasColumnName("EstadoProyecto_Id");

                entity.Property(e => e.NombreEstadoProyecto)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("Nombre_EstadoProyecto");
            });

            modelBuilder.Entity<EstadoRequerimiento>(entity =>
            {
                entity.ToTable("EstadoRequerimiento");

                entity.Property(e => e.NombreEstadoRequerimiento)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<EstadoUsuarioEmpleado>(entity =>
            {
                entity.HasKey(e => e.EstadoId)
                    .HasName("Pk_Estado_Empleado");

                entity.ToTable("Estado_Usuario_Empleado");

                entity.Property(e => e.EstadoId).HasColumnName("Estado_Id");

                entity.Property(e => e.Estado)
                    .HasMaxLength(15)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Estimacion>(entity =>
            {
                entity.ToTable("Estimacion");

                entity.Property(e => e.EstimacionId).HasColumnName("Estimacion_Id");

                entity.Property(e => e.EstadoId).HasColumnName("Estado_Id");

                entity.Property(e => e.FactorAjuste).HasColumnType("decimal(10, 2)");

                entity.Property(e => e.FechaCreacion)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.ProyectoId).HasColumnName("Proyecto_Id");

                entity.Property(e => e.TotalPuntoFuncionAjustado).HasColumnType("decimal(10, 2)");

                entity.Property(e => e.TotalPuntoFuncionSinAjustar).HasColumnType("decimal(10, 2)");

                entity.Property(e => e.UsuarioId).HasColumnName("Usuario_Id");

                entity.HasOne(d => d.Estado)
                    .WithMany(p => p.Estimacions)
                    .HasForeignKey(d => d.EstadoId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Fk_Estado_Id_Estimacion");

                entity.HasOne(d => d.Proyecto)
                    .WithMany(p => p.Estimacions)
                    .HasForeignKey(d => d.ProyectoId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Fk_ProyectoEstimacion_Id");

                entity.HasOne(d => d.Usuario)
                    .WithMany(p => p.Estimacions)
                    .HasForeignKey(d => d.UsuarioId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Fk_EstimacionUsurario_Id");
            });

            modelBuilder.Entity<EstimacionProductividad>(entity =>
            {
                entity.ToTable("Estimacion_Productividad");

                entity.Property(e => e.EstimacionProductividadId).HasColumnName("Estimacion_Productividad_Id");

                entity.Property(e => e.EsfuerzoProductividad).HasColumnType("decimal(10, 2)");

                entity.Property(e => e.EstimacionId).HasColumnName("Estimacion_Id");

                entity.Property(e => e.ProductividadId).HasColumnName("Productividad_Id");

                entity.HasOne(d => d.Estimacion)
                    .WithMany(p => p.EstimacionProductividads)
                    .HasForeignKey(d => d.EstimacionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Fk_EstimacionId_productividad");

                entity.HasOne(d => d.Productividad)
                    .WithMany(p => p.EstimacionProductividads)
                    .HasForeignKey(d => d.ProductividadId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Fk_ProductividadId_estimacion");
            });

            modelBuilder.Entity<HistorialProyecto>(entity =>
            {
                entity.ToTable("HistorialProyecto");

                entity.Property(e => e.HistorialProyectoId).HasColumnName("HistorialProyecto_Id");

                entity.Property(e => e.AccionRealizada)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Descripcion).IsUnicode(false);

                entity.Property(e => e.FechaCambio).HasColumnType("datetime");

                entity.Property(e => e.ProyectoId).HasColumnName("Proyecto_Id");

                entity.Property(e => e.UsuarioId).HasColumnName("Usuario_Id");

                entity.HasOne(d => d.Proyecto)
                    .WithMany(p => p.HistorialProyectos)
                    .HasForeignKey(d => d.ProyectoId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Fk_HistorialProyecto_Id");

                entity.HasOne(d => d.Usuario)
                    .WithMany(p => p.HistorialProyectos)
                    .HasForeignKey(d => d.UsuarioId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Fk_HistorialUsurario_Id");
            });

            modelBuilder.Entity<ParametrosEconomico>(entity =>
            {
                entity.HasKey(e => e.ParametroEconomicoId)
                    .HasName("Pk_parametros_economicos_id");

                entity.ToTable("Parametros_economico");

                entity.Property(e => e.ParametroEconomicoId).HasColumnName("Parametro_economico_id");

                entity.Property(e => e.EstimacionId).HasColumnName("Estimacion_Id");

                entity.Property(e => e.FechaCreacion)
                    .HasColumnType("datetime")
                    .HasColumnName("Fecha_creacion")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.NombreParametro)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("Nombre_parametro");

                entity.Property(e => e.ValorParametro)
                    .HasColumnType("decimal(10, 2)")
                    .HasColumnName("Valor_parametro");

                entity.HasOne(d => d.Estimacion)
                    .WithMany(p => p.ParametrosEconomicos)
                    .HasForeignKey(d => d.EstimacionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Fk_estimacion_id_parametros_economico");
            });

            modelBuilder.Entity<ParticipanteEstimacion>(entity =>
            {
                entity.ToTable("Participante_estimacion");

                entity.Property(e => e.ParticipanteEstimacionId).HasColumnName("Participante_estimacion_id");

                entity.Property(e => e.CantidadPersona).HasColumnName("Cantidad_persona");

                entity.Property(e => e.CargoId).HasColumnName("Cargo_id");

                entity.Property(e => e.EstimacionId).HasColumnName("Estimacion_Id");

                entity.HasOne(d => d.Cargo)
                    .WithMany(p => p.ParticipanteEstimacions)
                    .HasForeignKey(d => d.CargoId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Fk_cargo_id_participante_estimacion");

                entity.HasOne(d => d.Estimacion)
                    .WithMany(p => p.ParticipanteEstimacions)
                    .HasForeignKey(d => d.EstimacionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Fk_estimacion_id_participante_estimacion");
            });

            modelBuilder.Entity<ProductividadPuntoFuncion>(entity =>
            {
                entity.HasKey(e => e.ProductividadId)
                    .HasName("Pk_ProductividadId");

                entity.ToTable("ProductividadPuntoFuncion");

                entity.Property(e => e.ProductividadId).HasColumnName("Productividad_Id");

                entity.Property(e => e.EstadoId).HasColumnName("Estado_Id");

                entity.Property(e => e.FechaCreacion)
                    .HasColumnType("datetime")
                    .HasColumnName("Fecha_Creacion")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.NombrePlataforma)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.UsuarioId).HasColumnName("Usuario_Id");

                entity.HasOne(d => d.Estado)
                    .WithMany(p => p.ProductividadPuntoFuncions)
                    .HasForeignKey(d => d.EstadoId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Fk_EstadoProductividad_Id");

                entity.HasOne(d => d.Usuario)
                    .WithMany(p => p.ProductividadPuntoFuncions)
                    .HasForeignKey(d => d.UsuarioId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Fk_UsuarioProductividad_Id");
            });

            modelBuilder.Entity<Proyecto>(entity =>
            {
                entity.ToTable("Proyecto");

                entity.Property(e => e.ProyectoId).HasColumnName("Proyecto_Id");

                entity.Property(e => e.ClienteId).HasColumnName("Cliente_Id");

                entity.Property(e => e.Descripcion).IsUnicode(false);

                entity.Property(e => e.EstadoProyectoId)
                    .HasColumnName("EstadoProyecto_Id")
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.FechaCreacion)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.NombreProyecto).IsUnicode(false);

                entity.Property(e => e.TipoAplicacion).IsUnicode(false);

                entity.Property(e => e.TipoProyecto).IsUnicode(false);

                entity.Property(e => e.UsuarioId).HasColumnName("Usuario_Id");

                entity.HasOne(d => d.Cliente)
                    .WithMany(p => p.Proyectos)
                    .HasForeignKey(d => d.ClienteId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Fk_ClienteP_royecto_Id");

                entity.HasOne(d => d.EstadoProyecto)
                    .WithMany(p => p.Proyectos)
                    .HasForeignKey(d => d.EstadoProyectoId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Fk_Estado_Proyecto_Id");

                entity.HasOne(d => d.Usuario)
                    .WithMany(p => p.Proyectos)
                    .HasForeignKey(d => d.UsuarioId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Fk_Usuario_Proyecto_Id");
            });

            modelBuilder.Entity<PuntajeCaracteristica>(entity =>
            {
                entity.HasKey(e => e.IdPuntaje)
                    .HasName("PK_Puntaje_Id");

                entity.ToTable("Puntaje_Caracteristica");

                entity.Property(e => e.IdPuntaje).HasColumnName("idPuntaje");

                entity.Property(e => e.Significado)
                    .IsUnicode(false)
                    .HasColumnName("significado");

                entity.Property(e => e.Valor).HasColumnName("valor");
            });

            modelBuilder.Entity<PuntoFuncionAjustado>(entity =>
            {
                entity.ToTable("Punto_funcion_ajustado");

                entity.Property(e => e.PuntoFuncionAjustadoId).HasColumnName("Punto_funcion_ajustado_id");

                entity.Property(e => e.Alta).HasColumnName("alta");

                entity.Property(e => e.Baja).HasColumnName("baja");

                entity.Property(e => e.Media).HasColumnName("media");

                entity.Property(e => e.ProyectoId).HasColumnName("Proyecto_id");

                entity.Property(e => e.TipoComponenteId).HasColumnName("Tipo_componente_id");

                entity.Property(e => e.Total).HasColumnName("total");

                entity.HasOne(d => d.Proyecto)
                    .WithMany(p => p.PuntoFuncionAjustados)
                    .HasForeignKey(d => d.ProyectoId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Fk_Proyecto_id_punto_funcion_ajustado");

                entity.HasOne(d => d.TipoComponente)
                    .WithMany(p => p.PuntoFuncionAjustados)
                    .HasForeignKey(d => d.TipoComponenteId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Fk_tipo_componente_punto_funcion_ajustado");
            });

            modelBuilder.Entity<RequerimientosCliente>(entity =>
            {
                entity.HasKey(e => e.RequerimientoId)
                    .HasName("Pk_RequerimientoCliente_Id");

                entity.ToTable("RequerimientosCliente");

                entity.Property(e => e.RequerimientoId).HasColumnName("Requerimiento_Id");

                entity.Property(e => e.EstadoId)
                    .HasColumnName("Estado_Id")
                    .HasDefaultValueSql("((2))");

                entity.Property(e => e.FechaCreacion)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.ProyectoId).HasColumnName("Proyecto_Id");

                entity.Property(e => e.Requisito).IsUnicode(false);

                entity.Property(e => e.TipoRequerimientoId).HasColumnName("TipoRequerimiento_Id");

                entity.Property(e => e.UsuarioId).HasColumnName("Usuario_Id");

                entity.HasOne(d => d.Estado)
                    .WithMany(p => p.RequerimientosClientes)
                    .HasForeignKey(d => d.EstadoId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Fk_EstadoRequerimiento_Id");

                entity.HasOne(d => d.Proyecto)
                    .WithMany(p => p.RequerimientosClientes)
                    .HasForeignKey(d => d.ProyectoId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Fk_ProyectoRequerimiento_Id");

                entity.HasOne(d => d.TipoRequerimiento)
                    .WithMany(p => p.RequerimientosClientes)
                    .HasForeignKey(d => d.TipoRequerimientoId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Fk_requerimiento_tipo_Id");

                entity.HasOne(d => d.Usuario)
                    .WithMany(p => p.RequerimientosClientes)
                    .HasForeignKey(d => d.UsuarioId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Fk_UsurarioCreadorRquerimientos_Id");
            });

            modelBuilder.Entity<RequerimientosSoftware>(entity =>
            {
                entity.ToTable("RequerimientosSoftware");

                entity.Property(e => e.EstadoId)
                    .HasColumnName("Estado_Id")
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.FechaCreacion)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.RequerimientoSf)
                    .IsUnicode(false)
                    .HasColumnName("Requerimiento_Sf");

                entity.Property(e => e.RequerimientosClienteId).HasColumnName("Requerimientos_Cliente_Id");

                entity.HasOne(d => d.Estado)
                    .WithMany(p => p.RequerimientosSoftwares)
                    .HasForeignKey(d => d.EstadoId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Fk_EstadoRequerimientoSw_Id");

                entity.HasOne(d => d.RequerimientosCliente)
                    .WithMany(p => p.RequerimientosSoftwares)
                    .HasForeignKey(d => d.RequerimientosClienteId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Fk_RequerimientoCliente_requisitoSW_Id");
            });

            modelBuilder.Entity<Rol>(entity =>
            {
                entity.HasKey(e => e.IdRol);

                entity.ToTable("Rol");

                entity.Property(e => e.IdRol).HasColumnName("Id_rol");

                entity.Property(e => e.Nombre)
                    .HasMaxLength(25)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TarifarioHora>(entity =>
            {
                entity.HasKey(e => e.TarifarioId)
                    .HasName("Pk_TarifarioId");

                entity.ToTable("TarifarioHora");

                entity.Property(e => e.TarifarioId).HasColumnName("Tarifario_Id");

                entity.Property(e => e.CargoId).HasColumnName("Cargo_Id");

                entity.Property(e => e.EmpleadoId).HasColumnName("Empleado_Id");

                entity.Property(e => e.FechaCreacion)
                    .HasColumnType("datetime")
                    .HasColumnName("Fecha_Creacion")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.MontoTarifa).HasColumnType("money");

                entity.Property(e => e.UsuarioId).HasColumnName("Usuario_Id");

                entity.HasOne(d => d.Cargo)
                    .WithMany(p => p.TarifarioHoras)
                    .HasForeignKey(d => d.CargoId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Fk_Cargo_Usuario");

                entity.HasOne(d => d.Empleado)
                    .WithMany(p => p.TarifarioHoras)
                    .HasForeignKey(d => d.EmpleadoId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Fk_EmpleadoTarifario_Id");

                entity.HasOne(d => d.Usuario)
                    .WithMany(p => p.TarifarioHoras)
                    .HasForeignKey(d => d.UsuarioId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Fk_Usuario_Id");
            });

            modelBuilder.Entity<TipoCliente>(entity =>
            {
                entity.HasKey(e => e.TipoId)
                    .HasName("Pk_TipoCliente");

                entity.ToTable("TipoCliente");

                entity.Property(e => e.TipoId).HasColumnName("Tipo_Id");

                entity.Property(e => e.NombreTipoCliente)
                    .HasMaxLength(25)
                    .IsUnicode(false)
                    .HasColumnName("NombreTipo_Cliente");
            });

            modelBuilder.Entity<TipoComponente>(entity =>
            {
                entity.ToTable("TipoComponente");

                entity.Property(e => e.TipoComponenteId).HasColumnName("TipoComponente_Id");

                entity.Property(e => e.NombreComponente)
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TipoRequerimiento>(entity =>
            {
                entity.ToTable("TipoRequerimiento");

                entity.Property(e => e.TipoRequerimientoId).HasColumnName("tipoRequerimiento_Id");

                entity.Property(e => e.Nombre)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("nombre");
            });

            modelBuilder.Entity<Usuario>(entity =>
            {
                entity.ToTable("Usuario");

                entity.Property(e => e.UsuarioId).HasColumnName("Usuario_Id");

                entity.Property(e => e.EmpleadoId).HasColumnName("Empleado_Id");

                entity.Property(e => e.EstadoUsuarioId).HasColumnName("EstadoUsuario_Id");

                entity.Property(e => e.FechaCreacion)
                    .HasColumnType("datetime")
                    .HasColumnName("fechaCreacion")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.IdRol).HasColumnName("Id_rol");

                entity.HasOne(d => d.Empleado)
                    .WithMany(p => p.Usuarios)
                    .HasForeignKey(d => d.EmpleadoId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Fk_Empleado_UsuarioId");

                entity.HasOne(d => d.EstadoUsuario)
                    .WithMany(p => p.Usuarios)
                    .HasForeignKey(d => d.EstadoUsuarioId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Estado_Usuario");

                entity.HasOne(d => d.IdRolNavigation)
                    .WithMany(p => p.Usuarios)
                    .HasForeignKey(d => d.IdRol)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Fk_RolUsuario");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
