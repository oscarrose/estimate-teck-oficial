﻿using System;
using System.Collections.Generic;

namespace estimate_teck.Models
{
    public partial class EstadoRequerimiento
    {
        public EstadoRequerimiento()
        {
            RequerimientosClientes = new HashSet<RequerimientosCliente>();
        }

        public int EstadoRequerimientoId { get; set; }
        public string? NombreEstadoRequerimiento { get; set; }

        public virtual ICollection<RequerimientosCliente> RequerimientosClientes { get; set; }
    }
}
