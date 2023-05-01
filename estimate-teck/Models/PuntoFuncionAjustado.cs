﻿using System;
using System.Collections.Generic;

namespace estimate_teck.Models
{
    public partial class PuntoFuncionAjustado
    {
        public int PuntoFuncionAjustadoId { get; set; }
        public int TipoComponenteId { get; set; }
        public int ProyectoId { get; set; }
        public int Baja { get; set; }
        public int Media { get; set; }
        public int Alta { get; set; }
        public int Total { get; set; }

        public virtual Proyecto Proyecto { get; set; } = null!;
        public virtual TipoComponente TipoComponente { get; set; } = null!;
    }
}
