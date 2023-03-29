using System;
using System.Collections.Generic;

namespace estimate_teck.Models
{
    public partial class Estimacion
    {
        public Estimacion()
        {
            CaracteristicaSistemas = new HashSet<CaracteristicaSistema>();
            ComponenteFuncionales = new HashSet<ComponenteFuncionale>();
            ConteoTipoComponentes = new HashSet<ConteoTipoComponente>();
            DetalleEstimacions = new HashSet<DetalleEstimacion>();
            ParametrosEconomicos = new HashSet<ParametrosEconomico>();
            ParticipanteEstimacions = new HashSet<ParticipanteEstimacion>();
            PuntoFuncionAjustados = new HashSet<PuntoFuncionAjustado>();
        }

        public int EstimacionId { get; set; }
        public int ProyectoId { get; set; }
        public int ProductividadId { get; set; }
        public decimal? FactorAjuste { get; set; }
        public decimal? TotalPuntoFuncionAjustado { get; set; }
        public decimal? TotalPuntoFuncionSinAjustar { get; set; }

        public virtual ProductividadPuntoFuncion Productividad { get; set; } = null!;
        public virtual Proyecto Proyecto { get; set; } = null!;
        public virtual ICollection<CaracteristicaSistema> CaracteristicaSistemas { get; set; }
        public virtual ICollection<ComponenteFuncionale> ComponenteFuncionales { get; set; }
        public virtual ICollection<ConteoTipoComponente> ConteoTipoComponentes { get; set; }
        public virtual ICollection<DetalleEstimacion> DetalleEstimacions { get; set; }
        public virtual ICollection<ParametrosEconomico> ParametrosEconomicos { get; set; }
        public virtual ICollection<ParticipanteEstimacion> ParticipanteEstimacions { get; set; }
        public virtual ICollection<PuntoFuncionAjustado> PuntoFuncionAjustados { get; set; }
    }
}
