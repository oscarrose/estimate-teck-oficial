using System;
using System.Collections.Generic;

namespace estimate_teck.Models
{
    public partial class EstadoEstimacion
    {
        public EstadoEstimacion()
        {
            Estimacions = new HashSet<Estimacion>();
        }

        public int EstadoId { get; set; }
        public string Estado { get; set; } = null!;

        public virtual ICollection<Estimacion> Estimacions { get; set; }
    }
}
