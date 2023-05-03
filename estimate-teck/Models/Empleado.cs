using System;
using System.Collections.Generic;

namespace estimate_teck.Models
{
    public partial class Empleado
    {
        public Empleado()
        {
            TarifarioHoras = new HashSet<TarifarioHora>();
            Usuarios = new HashSet<Usuario>();
        }

        public int EmpleadoId { get; set; }
        public int EstadoId { get; set; }
        public int CargoId { get; set; }
        public string? CreadoPor { get; set; }
        public string Nombre { get; set; } = null!;
        public string Apellido { get; set; } = null!;
        public string Identificacion { get; set; } = null!;
        public DateTime FechaNacimiento { get; set; }
        public string Email { get; set; } = null!;
        public string? TelefonoResidencial { get; set; }
        public string Celular { get; set; } = null!;
        public string Pais { get; set; } = null!;
        public string Estado { get; set; } = null!;
        public string Ciudad { get; set; } = null!;
        public string Direccion { get; set; } = null!;
        public DateTime? FechaCreacion { get; set; }

        public virtual Cargo? Cargo { get; set; } = null!;
        public virtual EstadoUsuarioEmpleado? EstadoNavigation { get; set; } = null!;
        public virtual ICollection<TarifarioHora>? TarifarioHoras { get; set; }
        public virtual ICollection<Usuario>? Usuarios { get; set; }
    }
}
