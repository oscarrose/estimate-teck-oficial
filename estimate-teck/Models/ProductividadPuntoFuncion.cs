using System;
using System.Collections.Generic;

namespace estimate_teck.Models
{
    public partial class ProductividadPuntoFuncion
    {
        public ProductividadPuntoFuncion()
        {
            Estimacions = new HashSet<Estimacion>();
        }

        public int ProductividadId { get; set; }
        public int UsuarioId { get; set; }
        public string NombrePlataforma { get; set; } = null!;
        public int? NivelBajo { get; set; }
        public int? NivelMedio { get; set; }
        public int? NivelAlto { get; set; }
        public DateTime? FechaCreacion { get; set; }

        public virtual Usuario Usuario { get; set; } = null!;
        public virtual ICollection<Estimacion> Estimacions { get; set; }
    }
}
