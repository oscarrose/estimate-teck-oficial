using System;
using System.Collections.Generic;

namespace estimate_teck.Models;

public partial class Empleado
{
    public int EmpleadoId { get; set; }

    public int EstadoId { get; set; }

    public int CargoId { get; set; }

    public string Nombre { get; set; } = null!;

    public string Apellido { get; set; } = null!;

    public string Identificacion { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string? TelefonoResidencial { get; set; }

    public string Celular { get; set; } = null!;

    public string Ciudad { get; set; } = null!;

    public string Calle { get; set; } = null!;

    public string Sector { get; set; } = null!;

    public DateTime? FechaCreacion { get; set; }

    public virtual Cargo Cargo { get; set; } = null!;

    public virtual EstadoUsuarioEmpleado Estado { get; set; } = null!;

    public virtual ICollection<Usuario> Usuarios { get; } = new List<Usuario>();
}
