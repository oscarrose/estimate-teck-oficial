using System;
using System.Collections.Generic;

namespace estimate_teck.Models;

public partial class Usuario
{
    public int UsuarioId { get; set; }

    public int EmpleadoId { get; set; }

    public int EstadoUsuarioId { get; set; }

    public int IdRol { get; set; }

    public byte[] PasswordHast { get; set; } = null!;

    public byte[] PasswordSalt { get; set; } = null!;

    public DateTime? FechaCreacion { get; set; }

    public virtual Empleado Empleado { get; set; } = null!;

    public virtual EstadoUsuarioEmpleado EstadoUsuario { get; set; } = null!;

    public virtual ICollection<HistorialProyecto> HistorialProyectos { get; } = new List<HistorialProyecto>();

    public virtual Rol IdRolNavigation { get; set; } = null!;

    public virtual ICollection<ProductividadPuntoFuncion> ProductividadPuntoFuncions { get; } = new List<ProductividadPuntoFuncion>();

    public virtual ICollection<Proyecto> Proyectos { get; } = new List<Proyecto>();

    public virtual ICollection<TarifarioHora> TarifarioHoras { get; } = new List<TarifarioHora>();
}
