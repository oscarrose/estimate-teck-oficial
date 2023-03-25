using System;
using System.Collections.Generic;

namespace estimate_teck.Models
{
    public partial class PuntoFuncionAjustado
    {
        public int PuntoFuncionAjustadoId { get; set; }
        public int TipoConponenteId { get; set; }
        public int EstimacionId { get; set; }
        public int Baja { get; set; }
        public int Media { get; set; }
        public int Alta { get; set; }

        public virtual Estimacion Estimacion { get; set; } = null!;
        public virtual TipoComponente TipoConponente { get; set; } = null!;
    }
}
