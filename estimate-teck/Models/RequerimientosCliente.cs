using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using Newtonsoft.Json;

namespace estimate_teck.Models
{
    public partial class RequerimientosCliente
    {
        public RequerimientosCliente()
        {
            ComponenteFuncionales = new HashSet<ComponenteFuncionale>();
        }

        public int RequerimientoId { get; set; }
        public int EstadoId { get; set; }
        public int ProyectoId { get; set; }
        public int TipoRequerimientoId { get; set; }
        public string Descripcion { get; set; } = null!;
        public DateTime? FechaCreacion { get; set; }
        
          
        [JsonIgnore]
        [IgnoreDataMember]
        public virtual EstadoRequerimiento? Estado { get; set; } = null!;
        [JsonIgnore]
        [IgnoreDataMember]
        public virtual Proyecto? Proyecto { get; set; } = null!;
        [JsonIgnore]
        [IgnoreDataMember]
        public virtual TipoRequerimiento? TipoRequerimiento { get; set; } = null!;
        public virtual ICollection<ComponenteFuncionale> ComponenteFuncionales { get; set; }
    }
}
