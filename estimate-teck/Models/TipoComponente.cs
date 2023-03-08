using System;
using System.Collections.Generic;

namespace estimate_teck.Models
{
    public partial class TipoComponente
    {
        public TipoComponente()
        {
            ComponenteFuncionales = new HashSet<ComponenteFuncionale>();
            ConteoTipoComponentes = new HashSet<ConteoTipoComponente>();
            PuntoFuncionAjustados = new HashSet<PuntoFuncionAjustado>();
        }

        public int TipoComponenteId { get; set; }
        public string? NombreComponente { get; set; }

        public virtual ICollection<ComponenteFuncionale> ComponenteFuncionales { get; set; }
        public virtual ICollection<ConteoTipoComponente> ConteoTipoComponentes { get; set; }
        public virtual ICollection<PuntoFuncionAjustado> PuntoFuncionAjustados { get; set; }
    }
}
