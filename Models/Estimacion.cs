using System;
using System.Collections.Generic;

namespace estimate_teck.Models
{
    public partial class Estimacion
    {
        public Estimacion()
        {
            DetalleEstimacions = new HashSet<DetalleEstimacion>();
            ParametrosEconomicos = new HashSet<ParametrosEconomico>();
            ParticipanteEstimacions = new HashSet<ParticipanteEstimacion>();
        }

        public int EstimacionId { get; set; }
        public int ProyectoId { get; set; }
        public int ProductividadId { get; set; }
        public decimal? FactorAjuste { get; set; }
        public decimal? TotalPuntoFuncionAjustado { get; set; }
        public decimal? TotalPuntoFuncionSinAjustar { get; set; }

        public virtual ProductividadPuntoFuncion Productividad { get; set; } = null!;
        public virtual Proyecto Proyecto { get; set; } = null!;
        public virtual ICollection<DetalleEstimacion> DetalleEstimacions { get; set; }
        public virtual ICollection<ParametrosEconomico> ParametrosEconomicos { get; set; }
        public virtual ICollection<ParticipanteEstimacion> ParticipanteEstimacions { get; set; }
    }
}
