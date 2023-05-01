using System;
using System.Collections.Generic;

namespace estimate_teck.Models
{
    public partial class CaracteristicaSistema
    {
        public int CaracteristicaSistemaId { get; set; }
        public int ProyectoId { get; set; }
        public string Caracteristica { get; set; } = null!;
        public int Idpuntaje { get; set; }

        public virtual PuntajeCaracteristica IdpuntajeNavigation { get; set; } = null!;
        public virtual Proyecto Proyecto { get; set; } = null!;
    }
}
