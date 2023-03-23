using System;
using System.Collections.Generic;

namespace estimate_teck.Models;

public partial class EstadoProyecto
{
    public int EstadoProyectoId { get; set; }

    public string NombreEstadoProyecto { get; set; } = null!;

    public virtual ICollection<Proyecto> Proyectos { get; } = new List<Proyecto>();
}
