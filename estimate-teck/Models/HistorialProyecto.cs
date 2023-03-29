using System;
using System.Collections.Generic;

namespace estimate_teck.Models
{
    public partial class HistorialProyecto
    {
        public int HistorialProyectoId { get; set; }
        public int ProyectoId { get; set; }
        public int UsuarioId { get; set; }
        public DateTime? FechaCambio { get; set; }
        public string? AccionRealizada { get; set; }
        public string? Descripcion { get; set; }

        public virtual Proyecto Proyecto { get; set; } = null!;
        public virtual Usuario Usuario { get; set; } = null!;
    }
}
