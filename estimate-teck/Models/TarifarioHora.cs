using System;
using System.Collections.Generic;

namespace estimate_teck.Models
{
    public partial class TarifarioHora
    {
        public int TarifarioId { get; set; }
        public int CargoId { get; set; }
        public int UsuarioId { get; set; }
        public decimal MontoTarifa { get; set; }
        public DateTime FechaCreacion { get; set; }

        public virtual Cargo Cargo { get; set; } = null!;
        public virtual Usuario Usuario { get; set; } = null!;
    }
}
