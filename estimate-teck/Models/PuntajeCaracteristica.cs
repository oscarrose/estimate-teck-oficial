using System;
using System.Collections.Generic;

namespace estimate_teck.Models
{
    public partial class PuntajeCaracteristica
    {
        public PuntajeCaracteristica()
        {
            CaracteristicaSistemas = new HashSet<CaracteristicaSistema>();
        }

        public int IdPuntaje { get; set; }
        public int Valor { get; set; }
        public string Significado { get; set; } = null!;

        public virtual ICollection<CaracteristicaSistema> CaracteristicaSistemas { get; set; }
    }
}
