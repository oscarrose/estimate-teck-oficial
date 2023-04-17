using System;
using System.Collections.Generic;

namespace estimate_teck.Models
{
    public partial class EstadoUsuarioEmpleado
    {
        public EstadoUsuarioEmpleado()
        {
            Empleados = new HashSet<Empleado>();
            ProductividadPuntoFuncions = new HashSet<ProductividadPuntoFuncion>();
            Usuarios = new HashSet<Usuario>();
        }

        public int EstadoId { get; set; }
        public string Estado { get; set; } = null!;

        public virtual ICollection<Empleado> Empleados { get; set; }
        public virtual ICollection<ProductividadPuntoFuncion> ProductividadPuntoFuncions { get; set; }
        public virtual ICollection<Usuario> Usuarios { get; set; }
    }
}
