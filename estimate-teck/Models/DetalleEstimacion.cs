using System;
using System.Collections.Generic;

namespace estimate_teck.Models
{
    public partial class DetalleEstimacion
    {
        public int DetalleEstimacionId { get; set; }
        public int EstimacionId { get; set; }
        public decimal EsfuerzoTotal { get; set; }
        public decimal DuracionHoras { get; set; }
        public decimal DuracionDias { get; set; }
        public decimal DuracionMes { get; set; }
        public decimal CostoBrutoEstimado { get; set; }
        public decimal CostoTotal { get; set; }

        public virtual Estimacion? Estimacion { get; set; } = null!;
    }
}
