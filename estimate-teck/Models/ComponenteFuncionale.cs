using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using Newtonsoft.Json;

namespace estimate_teck.Models
{
    public partial class ComponenteFuncionale
    {
        public int ComponenteFuncionalesId { get; set; }
        public int EstimacionId { get; set; }
        public int RequerimientoId { get; set; }
        public int TipoComponenteId { get; set; }
        public string Complejidad { get; set; } = null!;
        [JsonIgnore]
        [IgnoreDataMember]
        public virtual Estimacion? Estimacion { get; set; } = null!;
        [JsonIgnore]
        [IgnoreDataMember]
        public virtual RequerimientosCliente? Requerimiento { get; set; } = null!;
         [JsonIgnore]
        [IgnoreDataMember]
        public virtual TipoComponente? TipoComponente { get; set; } = null!;
    }
}
