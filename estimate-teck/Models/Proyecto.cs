using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace estimate_teck.Models
{
    public partial class Proyecto
    {
        public Proyecto()
        {
            CaracteristicaSistemas = new HashSet<CaracteristicaSistema>();
            ComponenteFuncionales = new HashSet<ComponenteFuncionale>();
            ConteoTipoComponentes = new HashSet<ConteoTipoComponente>();
            Estimacions = new HashSet<Estimacion>();
            HistorialProyectos = new HashSet<HistorialProyecto>();
            PuntoFuncionAjustados = new HashSet<PuntoFuncionAjustado>();
            RequerimientosClientes = new HashSet<RequerimientosCliente>();
        }

        public int ProyectoId { get; set; }
        public int EstadoProyectoId { get; set; }
        public int UsuarioId { get; set; }
        public int ClienteId { get; set; }
        public string NombreProyecto { get; set; } = null!;
        public string? Descripcion { get; set; }
        public string TipoProyecto { get; set; } = null!;
        public string TipoAplicacion { get; set; } = null!;
        public DateTime? FechaCreacion { get; set; }

        [JsonIgnore]
        public virtual Cliente? Cliente { get; set; } = null!;
        [JsonIgnore]
        public virtual EstadoProyecto? EstadoProyecto { get; set; } = null!;
        [JsonIgnore]
        public virtual Usuario? Usuario { get; set; } = null!;
        [JsonIgnore]
        public virtual ICollection<CaracteristicaSistema>? CaracteristicaSistemas { get; set; }
        [JsonIgnore]
        public virtual ICollection<ComponenteFuncionale>?  ComponenteFuncionales { get; set; }
        [JsonIgnore]
        public virtual ICollection<ConteoTipoComponente>?  ConteoTipoComponentes { get; set; }
        [JsonIgnore]
        public virtual ICollection<Estimacion>?  Estimacions { get; set; }
        [JsonIgnore]
        public virtual ICollection<HistorialProyecto>?  HistorialProyectos { get; set; }
        [JsonIgnore]
        public virtual ICollection<PuntoFuncionAjustado>? PuntoFuncionAjustados { get; set; }
        [JsonIgnore]
        public virtual ICollection<RequerimientosCliente>? RequerimientosClientes { get; set; }
    }
}
