using System;
using System.Collections.Generic;

namespace estimate_teck.Models
{
    public partial class ParametrosEconomico
    {
        public int ParametroEconomicoId { get; set; }
        public int EstimacionId { get; set; }
        public string NombreParametro { get; set; } = null!;
        public decimal ValorParametro { get; set; }
        public DateTime? FechaCreacion { get; set; }

        public virtual Estimacion Estimacion { get; set; } = null!;
    }
}
