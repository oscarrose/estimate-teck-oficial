using System;
using System.Collections.Generic;

namespace estimate_teck.Models
{
    public partial class TipoRequerimiento
    {
        public TipoRequerimiento()
        {
            RequerimientosClientes = new HashSet<RequerimientosCliente>();
        }

        public int TipoRequerimientoId { get; set; }
        public string? Nombre { get; set; }

        public virtual ICollection<RequerimientosCliente> RequerimientosClientes { get; set; }
    }
}
