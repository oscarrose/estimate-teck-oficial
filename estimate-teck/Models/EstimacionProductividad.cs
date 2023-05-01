using System;
using System.Collections.Generic;

namespace estimate_teck.Models
{
    public partial class EstimacionProductividad
    {
        public int EstimacionProductividadId { get; set; }
        public int EstimacionId { get; set; }
        public int ProductividadId { get; set; }
        public decimal EsfuerzoProductividad { get; set; }
        public int ProgramadoresProductividad { get; set; }

        public virtual Estimacion Estimacion { get; set; } = null!;
        public virtual ProductividadPuntoFuncion Productividad { get; set; } = null!;
    }
}
