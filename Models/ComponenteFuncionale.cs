using System;
using System.Collections.Generic;

namespace estimate_teck.Models
{
    public partial class ComponenteFuncionale
    {
        public int ComponenteFuncionalesId { get; set; }
        public int UsuarioId { get; set; }
        public int ProyectoId { get; set; }
        public int RequerimientoSwId { get; set; }
        public int TipoComponenteId { get; set; }
        public string Complejidad { get; set; } = null!;

        public virtual Proyecto? Proyecto { get; set; } = null!;
        public virtual RequerimientosSoftware? RequerimientoSw { get; set; } = null!;
        public virtual TipoComponente? TipoComponente { get; set; } = null!;
        public virtual Usuario? Usuario { get; set; } = null!;
    }
}
