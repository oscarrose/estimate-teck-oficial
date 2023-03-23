using System;
using System.Collections.Generic;

namespace estimate_teck.Models;

public partial class RequerimientosCliente
{
    public int RequerimientoId { get; set; }

    public int ProyectoId { get; set; }

    public string? TipoRequerimiento { get; set; }

    public string? Descripcion { get; set; }

    public DateTime? FechaCreacion { get; set; }

    public virtual ICollection<ComponenteFuncionale> ComponenteFuncionales { get; } = new List<ComponenteFuncionale>();

    public virtual Proyecto Proyecto { get; set; } = null!;
}
