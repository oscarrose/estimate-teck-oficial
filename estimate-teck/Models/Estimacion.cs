using System;
using System.Collections.Generic;

namespace estimate_teck.Models;

public partial class Estimacion
{
    public int EstimacionId { get; set; }

    public int ProyectoId { get; set; }

    public int ProductividadId { get; set; }

    public decimal? FactorAjuste { get; set; }

    public decimal? TotalPuntoFuncionAjustado { get; set; }

    public decimal? TotalPuntoFuncionSinAjustar { get; set; }

    public virtual ICollection<CaracteristicaSistema> CaracteristicaSistemas { get; } = new List<CaracteristicaSistema>();

    public virtual ICollection<ComponenteFuncionale> ComponenteFuncionales { get; } = new List<ComponenteFuncionale>();

    public virtual ICollection<ConteoTipoComponente> ConteoTipoComponentes { get; } = new List<ConteoTipoComponente>();

    public virtual ICollection<DetalleEstimacion> DetalleEstimacions { get; } = new List<DetalleEstimacion>();

    public virtual ICollection<ParametrosEconomico> ParametrosEconomicos { get; } = new List<ParametrosEconomico>();

    public virtual ICollection<ParticipanteEstimacion> ParticipanteEstimacions { get; } = new List<ParticipanteEstimacion>();

    public virtual ProductividadPuntoFuncion Productividad { get; set; } = null!;

    public virtual Proyecto Proyecto { get; set; } = null!;

    public virtual ICollection<PuntoFuncionAjustado> PuntoFuncionAjustados { get; } = new List<PuntoFuncionAjustado>();
}
