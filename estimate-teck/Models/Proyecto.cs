using System;
using System.Collections.Generic;

namespace estimate_teck.Models;

public partial class Proyecto
{
    public int ProyectoId { get; set; }

    public int EstadoProyectoId { get; set; }

    public int UsuarioId { get; set; }

    public int ClienteId { get; set; }

    public string NombreProyecto { get; set; } = null!;

    public string Descripcion { get; set; } = null!;

    public DateTime? FechaInicio { get; set; }

    public DateTime? FechaFinalizacion { get; set; }

    public DateTime? FechaCreacion { get; set; }

    public virtual Cliente Cliente { get; set; } = null!;

    public virtual EstadoProyecto EstadoProyecto { get; set; } = null!;

    public virtual ICollection<Estimacion> Estimacions { get; } = new List<Estimacion>();

    public virtual ICollection<HistorialProyecto> HistorialProyectos { get; } = new List<HistorialProyecto>();

    public virtual ICollection<RequerimientosCliente> RequerimientosClientes { get; } = new List<RequerimientosCliente>();

    public virtual Usuario Usuario { get; set; } = null!;
}
