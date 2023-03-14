using System;
using System.Collections.Generic;

namespace estimate_teck.Models;

public partial class EstadoUsuarioEmpleado
{
    public int EstadoId { get; set; }

    public string Estado { get; set; } = null!;

    public virtual ICollection<Empleado> Empleados { get; } = new List<Empleado>();

    public virtual ICollection<ProductividadPuntoFuncion> ProductividadPuntoFuncions { get; } = new List<ProductividadPuntoFuncion>();

    public virtual ICollection<Usuario> Usuarios { get; } = new List<Usuario>();
}
