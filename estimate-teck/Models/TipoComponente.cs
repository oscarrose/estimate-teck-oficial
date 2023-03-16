using System;
using System.Collections.Generic;

namespace estimate_teck.Models;

public partial class TipoComponente
{
    public int TipoComponenteId { get; set; }

    public string? NombreComponente { get; set; }

    public virtual ICollection<ComponenteFuncionale> ComponenteFuncionales { get; } = new List<ComponenteFuncionale>();

    public virtual ICollection<ConteoTipoComponente> ConteoTipoComponentes { get; } = new List<ConteoTipoComponente>();

    public virtual ICollection<PuntoFuncionAjustado> PuntoFuncionAjustados { get; } = new List<PuntoFuncionAjustado>();
}
