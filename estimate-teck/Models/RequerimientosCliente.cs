using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using JsonIgnoreAttribute = System.Text.Json.Serialization.JsonIgnoreAttribute;

namespace estimate_teck.Models
{
    public partial class RequerimientosCliente
    {
        public RequerimientosCliente()
        {
            ComponenteFuncionales = new HashSet<ComponenteFuncionale>();
        }

        public int RequerimientoId { get; set; }
        public int ProyectoId { get; set; }
        public string? TipoRequerimiento { get; set; }
        public string? Descripcion { get; set; }
        public DateTime? FechaCreacion { get; set; }

        [JsonIgnore]
        [JsonPropertyName("Proyecto")]
        public virtual Proyecto? Proyecto { get; set; } = null!;

        [JsonIgnore]
        public virtual ICollection<ComponenteFuncionale>? ComponenteFuncionales { get; set; }
    }
}
