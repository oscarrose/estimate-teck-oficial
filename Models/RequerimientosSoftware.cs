using System;
using System.Collections.Generic;

namespace estimate_teck.Models
{
    public partial class RequerimientosSoftware
    {
        public int Id { get; set; }
        public int RequerimientosClienteId { get; set; }
        public int EstadoId { get; set; }
        public string RequerimientoSf { get; set; } = null!;
        public DateTime? FechaCreacion { get; set; }

        public virtual EstadoRequerimiento Estado { get; set; } = null!;
        public virtual RequerimientosCliente RequerimientosCliente { get; set; } = null!;
    }
}
