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
        public virtual DbSet<EstadoProyecto> EstadoProyectos { get; set; } = null!;
        public virtual DbSet<EstadoUsuarioEmpleado> EstadoUsuarioEmpleados { get; set; } = null!;
        public virtual DbSet<Estimacion> Estimacions { get; set; } = null!;
        public virtual DbSet<HistorialProyecto> HistorialProyectos { get; set; } = null!;
        public virtual DbSet<ParametrosEconomico> ParametrosEconomicos { get; set; } = null!;
        public virtual DbSet<ParticipanteEstimacion> ParticipanteEstimacions { get; set; } = null!;
        public virtual DbSet<ProductividadPuntoFuncion> ProductividadPuntoFuncions { get; set; } = null!;
        public virtual DbSet<Proyecto> Proyectos { get; set; } = null!;
        public virtual DbSet<PuntoFuncionAjustado> PuntoFuncionAjustados { get; set; } = null!;
        public virtual DbSet<RequerimientosCliente> RequerimientosClientes { get; set; } = null!;
        public virtual DbSet<Rol> Rols { get; set; } = null!;
        public virtual DbSet<TarifarioHora> TarifarioHoras { get; set; } = null!;
        public virtual DbSet<TipoCliente> TipoClientes { get; set; } = null!;
        public virtual DbSet<TipoComponente> TipoComponentes { get; set; } = null!;
        public virtual DbSet<Usuario> Usuarios { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=localhost; Database=estimate_teck;Trusted_Connection=True");
            }
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CaracteristicaSistema>(entity =>
            {
                entity.ToTable("Caracteristica_sistema");

                entity.Property(e => e.CaracteristicaSistemaId).HasColumnName("Caracteristica_sistema_id");

                entity.Property(e => e.Caracteristica).IsUnicode(false);

                entity.Property(e => e.EstimacionId).HasColumnName("Estimacion_Id");

                entity.HasOne(d => d.Estimacion)
                    .WithMany(p => p.CaracteristicaSistemas)
                    .HasForeignKey(d => d.EstimacionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Fk_estimacion_id_caracteristica_sistema");
            });

            modelBuilder.Entity<Cargo>(entity =>
            {
                entity.ToTable("Cargo");

                entity.Property(e => e.CargoId).HasColumnName("Cargo_Id");

                entity.Property(e => e.Descripcion)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Nombre)
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Cliente>(entity =>
            {
                entity.ToTable("Cliente");

                entity.Property(e => e.ClienteId).HasColumnName("Cliente_Id");

                entity.Property(e => e.Apellido)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.Calle)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Celular)
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.Ciudad)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Email)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.FechaCreacion)
                    .HasColumnType("datetime")
                    .HasColumnName("Fecha_Creacion")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Identificacion)
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.Nombre)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.Sector)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.TelefonoResidencial)
                    .HasMaxLength(15)
                    .IsUnicode(false)
                    .HasColumnName("Telefono_Residencial");

                entity.Property(e => e.TipoId).HasColumnName("Tipo_Id");

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

                entity.Property(e => e.EstimacionId).HasColumnName("Estimacion_Id");

                entity.Property(e => e.RequerimientoId).HasColumnName("Requerimiento_id");

                entity.Property(e => e.TipoComponenteId).HasColumnName("Tipo_componente_id");

                entity.HasOne(d => d.Estimacion)
                    .WithMany(p => p.ComponenteFuncionales)
                    .HasForeignKey(d => d.EstimacionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Fk_estimacion_id_componente_funcionales");

                entity.HasOne(d => d.Requerimiento)
                    .WithMany(p => p.ComponenteFuncionales)
                    .HasForeignKey(d => d.RequerimientoId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Fk_requerimiento_id_componente_funcionales");

                entity.HasOne(d => d.TipoComponente)
                    .WithMany(p => p.ComponenteFuncionales)
                    .HasForeignKey(d => d.TipoComponenteId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Fk_tipo_componente_componente_funcional");
            });

            modelBuilder.Entity<ConteoTipoComponente>(entity =>
            {
                entity.HasKey(e => e.ConteoComponenteId)
                    .HasName("Pk_conteo_tipo_componente");

                entity.ToTable("Conteo_tipo_componente");

                entity.Property(e => e.ConteoComponenteId).HasColumnName("Conteo_componente_id");

                entity.Property(e => e.Alta).HasColumnName("alta");

                entity.Property(e => e.Baja).HasColumnName("baja");

                entity.Property(e => e.EstimacionId).HasColumnName("Estimacion_id");

                entity.Property(e => e.Media).HasColumnName("media");

                entity.Property(e => e.TipoConponenteId).HasColumnName("Tipo_conponente_id");

                entity.HasOne(d => d.Estimacion)
                    .WithMany(p => p.ConteoTipoComponentes)
                    .HasForeignKey(d => d.EstimacionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Fk_estimacion_id_conteo_componente");

                entity.HasOne(d => d.TipoConponente)
                    .WithMany(p => p.ConteoTipoComponentes)
                    .HasForeignKey(d => d.TipoConponenteId)
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

                entity.Property(e => e.DuracionDias).HasColumnName("Duracion_dias");

                entity.Property(e => e.DuracionHoras)
                    .HasColumnType("decimal(10, 2)")
                    .HasColumnName("Duracion_horas");

                entity.Property(e => e.DuracionMes).HasColumnName("Duracion_mes");

                entity.Property(e => e.EsfuerzoTotal)
                    .HasColumnType("decimal(10, 2)")
                    .HasColumnName("Esfuerzo_total");

                entity.Property(e => e.EstimacionId).HasColumnName("Estimacion_Id");

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

                entity.Property(e => e.Calle)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.CargoId).HasColumnName("Cargo_Id");

                entity.Property(e => e.Celular)
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.Ciudad)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Email)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.EstadoId)
                    .HasColumnName("Estado_Id")
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.FechaCreacion)
                    .HasColumnType("datetime")
                    .HasColumnName("Fecha_Creacion")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Identificacion)
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.Nombre)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.Sector)
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

                entity.HasOne(d => d.Estado)
                    .WithMany(p => p.Empleados)
                    .HasForeignKey(d => d.EstadoId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Estado_UsuarioEmpleado");
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

                entity.Property(e => e.FactorAjuste).HasColumnType("decimal(10, 2)");

                entity.Property(e => e.ProductividadId).HasColumnName("Productividad_Id");

                entity.Property(e => e.ProyectoId).HasColumnName("Proyecto_Id");

                entity.Property(e => e.TotalPuntoFuncionAjustado).HasColumnType("decimal(10, 2)");

                entity.Property(e => e.TotalPuntoFuncionSinAjustar).HasColumnType("decimal(10, 2)");

                entity.HasOne(d => d.Productividad)
                    .WithMany(p => p.Estimacions)
                    .HasForeignKey(d => d.ProductividadId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Fk_ProductividadEstimacion_Id");

                entity.HasOne(d => d.Proyecto)
                    .WithMany(p => p.Estimacions)
                    .HasForeignKey(d => d.ProyectoId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Fk_ProyectoEstimacion_Id");
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

                entity.Property(e => e.FechaCreacion)
                    .HasColumnType("datetime")
                    .HasColumnName("Fecha_Creacion")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.NombrePlataforma)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.UsuarioId).HasColumnName("Usuario_Id");

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

                entity.Property(e => e.EstadoProyectoId).HasColumnName("EstadoProyecto_Id");

                entity.Property(e => e.FechaCreacion)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.FechaFinalizacion).HasColumnType("datetime");

                entity.Property(e => e.FechaInicio).HasColumnType("datetime");

                entity.Property(e => e.NombreProyecto).IsUnicode(false);

                entity.Property(e => e.UsuarioId).HasColumnName("Usuario_Id");

                entity.HasOne(d => d.Cliente)
                    .WithMany(p => p.Proyectos)
                    .HasForeignKey(d => d.ClienteId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Fk_ClienteProyecto_Id");

                entity.HasOne(d => d.EstadoProyecto)
                    .WithMany(p => p.Proyectos)
                    .HasForeignKey(d => d.EstadoProyectoId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Fk_EstadoProyecto_Id");

                entity.HasOne(d => d.Usuario)
                    .WithMany(p => p.Proyectos)
                    .HasForeignKey(d => d.UsuarioId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Fk_UsuarioProyecto_Id");
            });

            modelBuilder.Entity<PuntoFuncionAjustado>(entity =>
            {
                entity.ToTable("Punto_funcion_ajustado");

                entity.Property(e => e.PuntoFuncionAjustadoId).HasColumnName("Punto_funcion_ajustado_id");

                entity.Property(e => e.Alta).HasColumnName("alta");

                entity.Property(e => e.Baja).HasColumnName("baja");

                entity.Property(e => e.EstimacionId).HasColumnName("Estimacion_id");

                entity.Property(e => e.Media).HasColumnName("media");

                entity.Property(e => e.TipoConponenteId).HasColumnName("Tipo_conponente_id");

                entity.HasOne(d => d.Estimacion)
                    .WithMany(p => p.PuntoFuncionAjustados)
                    .HasForeignKey(d => d.EstimacionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Fk_estimacion_id_punto_funcion_ajustado");

                entity.HasOne(d => d.TipoConponente)
                    .WithMany(p => p.PuntoFuncionAjustados)
                    .HasForeignKey(d => d.TipoConponenteId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Fk_tipo_componente_punto_funcion_ajustado");
            });

            modelBuilder.Entity<RequerimientosCliente>(entity =>
            {
                entity.HasKey(e => e.RequerimientoId)
                    .HasName("Pk_RequerimientoCliente_Id");

                entity.ToTable("RequerimientosCliente");

                entity.Property(e => e.RequerimientoId).HasColumnName("Requerimiento_Id");

                entity.Property(e => e.Descripcion).IsUnicode(false);

                entity.Property(e => e.FechaCreacion)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.ProyectoId).HasColumnName("Proyecto_Id");

                entity.Property(e => e.TipoRequerimiento)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.Proyecto)
                    .WithMany(p => p.RequerimientosClientes)
                    .HasForeignKey(d => d.ProyectoId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Fk_ProyectoRequerimiento_Id");
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

                entity.Property(e => e.FechaCreacion)
                    .HasColumnType("datetime")
                    .HasColumnName("Fecha_Creacion");

                entity.Property(e => e.MontoTarifa).HasColumnType("money");

                entity.Property(e => e.UsuarioId).HasColumnName("Usuario_Id");

                entity.HasOne(d => d.Cargo)
                    .WithMany(p => p.TarifarioHoras)
                    .HasForeignKey(d => d.CargoId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Fk_Cargo_Usuario");

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
                    .HasConstraintName("Fk_EmpleadoUsuarioId");

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
