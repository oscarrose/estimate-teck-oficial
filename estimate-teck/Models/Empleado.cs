using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;
 
namespace estimate_teck.Models
{
    public partial class Empleado
    {
        public Empleado()
        {
            Usuarios = new HashSet<Usuario>();
        }
        [Key]
        public int EmpleadoId { get; set; }
        public int EstadoId { get; set; }
        public int CargoId { get; set; }
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
        public virtual Cargo? Cargo { get; set; } = null!;
        [JsonIgnore]
        [IgnoreDataMember]
        public virtual EstadoUsuarioEmpleado? Estado { get; set; } = null!;
        public virtual ICollection<Usuario> Usuarios { get; set; }
    }
}
