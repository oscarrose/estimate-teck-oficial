﻿using System;
using System.Collections.Generic;

namespace estimate_teck.Models
{
    public partial class Usuario
    {
        public Usuario()
        {
            ComponenteFuncionales = new HashSet<ComponenteFuncionale>();
            Estimacions = new HashSet<Estimacion>();
            HistorialProyectos = new HashSet<HistorialProyecto>();
            ProductividadPuntoFuncions = new HashSet<ProductividadPuntoFuncion>();
            Proyectos = new HashSet<Proyecto>();
            RequerimientosClientes = new HashSet<RequerimientosCliente>();
            TarifarioHoras = new HashSet<TarifarioHora>();
        }

        public int UsuarioId { get; set; }
        public int EmpleadoId { get; set; }
        public int EstadoUsuarioId { get; set; }
        public int IdRol { get; set; }
        public byte[] PasswordHast { get; set; } = null!;
        public byte[] PasswordSalt { get; set; } = null!;
        public DateTime? FechaCreacion { get; set; }

        public virtual Empleado Empleado { get; set; } = null!;
        public virtual EstadoUsuarioEmpleado EstadoUsuario { get; set; } = null!;
        public virtual Rol IdRolNavigation { get; set; } = null!;
        public virtual ICollection<ComponenteFuncionale> ComponenteFuncionales { get; set; }
        public virtual ICollection<Estimacion> Estimacions { get; set; }
        public virtual ICollection<HistorialProyecto> HistorialProyectos { get; set; }
        public virtual ICollection<ProductividadPuntoFuncion> ProductividadPuntoFuncions { get; set; }
        public virtual ICollection<Proyecto> Proyectos { get; set; }
        public virtual ICollection<RequerimientosCliente> RequerimientosClientes { get; set; }
        public virtual ICollection<TarifarioHora> TarifarioHoras { get; set; }
    }
}
