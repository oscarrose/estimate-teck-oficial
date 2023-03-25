using System;
using System.Collections.Generic;

namespace estimate_teck.Models
{
    public partial class Proyecto
    {
        public Proyecto()
        {
            Estimacions = new HashSet<Estimacion>();
            HistorialProyectos = new HashSet<HistorialProyecto>();
            RequerimientosClientes = new HashSet<RequerimientosCliente>();
        }

        public int ProyectoId { get; set; }
        public int EstadoProyectoId { get; set; }
        public int UsuarioId { get; set; }
        public int ClienteId { get; set; }
        public string NombreProyecto { get; set; } = null!;
        public string Descripcion { get; set; } = null!;
        public DateTime? FechaInicio { get; set; }
        public DateTime? FechaFinalizacion { get; set; }
        public DateTime? FechaCreacion { get; set; }

        public virtual Cliente Cliente { get; set; } = null!;
        public virtual EstadoProyecto EstadoProyecto { get; set; } = null!;
        public virtual Usuario Usuario { get; set; } = null!;
        public virtual ICollection<Estimacion> Estimacions { get; set; }
        public virtual ICollection<HistorialProyecto> HistorialProyectos { get; set; }
        public virtual ICollection<RequerimientosCliente> RequerimientosClientes { get; set; }
    }
}
