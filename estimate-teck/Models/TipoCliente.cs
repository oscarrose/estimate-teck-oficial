using System;
using System.Collections.Generic;

namespace estimate_teck.Models
{
    public partial class TipoCliente
    {
        public TipoCliente()
        {
            Clientes = new HashSet<Cliente>();
        }

        public int TipoId { get; set; }
        public string NombreTipoCliente { get; set; } = null!;

        public virtual ICollection<Cliente> Clientes { get; set; }
    }
}
