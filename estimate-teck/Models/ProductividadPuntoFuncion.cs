using System;
using System.Collections.Generic;

namespace estimate_teck.Models
{
    public partial class ProductividadPuntoFuncion
    {
        public ProductividadPuntoFuncion()
        {
            EstimacionProductividads = new HashSet<EstimacionProductividad>();
        }

        public int ProductividadId { get; set; }
        public int UsuarioId { get; set; }
        public int EstadoId { get; set; }
        public string NombrePlataforma { get; set; } = null!;
        public int? NivelBajo { get; set; }
        public int? NivelMedio { get; set; }
        public int? NivelAlto { get; set; }
        public DateTime? FechaCreacion { get; set; }

        public virtual EstadoUsuarioEmpleado? Estado { get; set; } = null!;
        public virtual Usuario? Usuario { get; set; } = null!;
        public virtual ICollection<EstimacionProductividad>? EstimacionProductividads { get; set; }
    }
}
