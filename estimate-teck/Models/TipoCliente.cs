using System;
using System.Collections.Generic;

namespace estimate_teck.Models;

public partial class TipoCliente
{
    public int TipoId { get; set; }

    public string NombreTipoCliente { get; set; } = null!;

    public virtual ICollection<Cliente> Clientes { get; } = new List<Cliente>();
}
