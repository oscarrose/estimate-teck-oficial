using System;
using System.Collections.Generic;

namespace estimate_teck.Models
{
    public partial class ComponenteFuncionale
    {
        public int ComponenteFuncionalesId { get; set; }
        public int EstimacionId { get; set; }
        public int RequerimientoId { get; set; }
        public int TipoComponenteId { get; set; }
        public string Complejidad { get; set; } = null!;

        public virtual Estimacion Estimacion { get; set; } = null!;
        public virtual RequerimientosCliente Requerimiento { get; set; } = null!;
        public virtual TipoComponente TipoComponente { get; set; } = null!;
    }
}
