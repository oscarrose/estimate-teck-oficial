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
        public DateTime? FechaCreacion { get; set; }

        public virtual Cliente? Cliente { get; set; } = null!;
        public virtual EstadoProyecto? EstadoProyecto { get; set; } = null!;
        public virtual Usuario? Usuario { get; set; } = null!;
        public virtual ICollection<CaracteristicaSistema> CaracteristicaSistemas { get; set; }
        public virtual ICollection<ComponenteFuncionale> ComponenteFuncionales { get; set; }
        public virtual ICollection<ConteoTipoComponente> ConteoTipoComponentes { get; set; }
        public virtual ICollection<Estimacion> Estimacions { get; set; }
        public virtual ICollection<HistorialProyecto> HistorialProyectos { get; set; }
        public virtual ICollection<PuntoFuncionAjustado> PuntoFuncionAjustados { get; set; }
        public virtual ICollection<RequerimientosCliente> RequerimientosClientes { get; set; }
    }
}
