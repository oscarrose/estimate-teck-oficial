using System;
using System.Collections.Generic;

namespace estimate_teck.Models
{
    public partial class CaracteristicaSistema
    {
        public int CaracteristicaSistemaId { get; set; }
        public int EstimacionId { get; set; }
        public string Caracteristica { get; set; } = null!;
        public int Puntaje { get; set; }

        public virtual Estimacion Estimacion { get; set; } = null!;
    }
}
