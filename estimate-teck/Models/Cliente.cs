using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Runtime.Serialization;

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
        public string Nombre { get; set; } = null!;
        public string Apellido { get; set; } = null!;
        public string Identificacion { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string? TelefonoResidencial { get; set; }
        public string Celular { get; set; } = null!;
        public string Ciudad { get; set; } = null!;
        public string Calle { get; set; } = null!;
        public string Sector { get; set; } = null!;
        public DateTime? FechaCreacion { get; set; }

        [JsonIgnore]
        [IgnoreDataMember]
        public virtual TipoCliente? Tipo { get; set; } = null!;
       
        public virtual ICollection<Proyecto> Proyectos { get; set; }
    }
}
