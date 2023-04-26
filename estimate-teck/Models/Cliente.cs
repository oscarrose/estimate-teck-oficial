using System;
using System.Collections.Generic;

namespace estimate_teck.Models
{
    public partial class Cliente
    {
        public Cliente()
        {
            Proyectos = new HashSet<Proyecto>();
        }

        public int ClienteId { get; set; }
        public int TipoId { get; set; }
        public string NombreCliente { get; set; } = null!;
        public string TipoIdentificacion { get; set; } = null!;
        public string Identificacion { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string? TelefonoResidencial { get; set; }
        public string Celular { get; set; } = null!;
        public string Pais { get; set; } = null!;
        public string? Estado { get; set; }
        public string? Ciudad { get; set; }
        public string Direccion { get; set; } = null!;
        public DateTime? FechaCreacion { get; set; }

        public virtual TipoCliente? Tipo { get; set; } = null!;
        public virtual ICollection<Proyecto> Proyectos { get; set; }
    }
}
