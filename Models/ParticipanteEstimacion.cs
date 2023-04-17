using System;
using System.Collections.Generic;

namespace estimate_teck.Models
{
    public partial class ParticipanteEstimacion
    {
        public int ParticipanteEstimacionId { get; set; }
        public int CargoId { get; set; }
        public int EstimacionId { get; set; }
        public int CantidadPersona { get; set; }

        public virtual Cargo Cargo { get; set; } = null!;
        public virtual Estimacion Estimacion { get; set; } = null!;
    }
}
