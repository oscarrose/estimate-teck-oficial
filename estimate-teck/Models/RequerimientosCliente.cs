using System;
using System.Collections.Generic;

namespace estimate_teck.Models
{
    public partial class RequerimientosCliente
    {
        public RequerimientosCliente()
        {
            RequerimientosSoftwares = new HashSet<RequerimientosSoftware>();
        }

        public int RequerimientoId { get; set; }
        public int ProyectoId { get; set; }
        public int UsuarioId { get; set; }
        public int EstadoId { get; set; }
        public int TipoRequerimientoId { get; set; }
        public string Requisito { get; set; } = null!;
        public DateTime? FechaCreacion { get; set; }

        public virtual EstadoRequerimiento Estado { get; set; } = null!;
        public virtual Proyecto Proyecto { get; set; } = null!;
        public virtual TipoRequerimiento TipoRequerimiento { get; set; } = null!;
        public virtual Usuario Usuario { get; set; } = null!;
        public virtual ICollection<RequerimientosSoftware> RequerimientosSoftwares { get; set; }
    }
}
