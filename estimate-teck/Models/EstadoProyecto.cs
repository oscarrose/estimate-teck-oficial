using System;
using System.Collections.Generic;

namespace estimate_teck.Models
{
    public partial class EstadoProyecto
    {
        public EstadoProyecto()
        {
            Proyectos = new HashSet<Proyecto>();
        }

        public int EstadoProyectoId { get; set; }
        public string NombreEstadoProyecto { get; set; } = null!;

        public virtual ICollection<Proyecto> Proyectos { get; set; }
    }
}
