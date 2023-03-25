using System;
using System.Collections.Generic;

namespace estimate_teck.Models
{
    public partial class Cargo
    {
        public Cargo()
        {
            Empleados = new HashSet<Empleado>();
            ParticipanteEstimacions = new HashSet<ParticipanteEstimacion>();
            TarifarioHoras = new HashSet<TarifarioHora>();
        }

        public int CargoId { get; set; }
        public string Nombre { get; set; } = null!;
        public string Descripcion { get; set; } = null!;

        public virtual ICollection<Empleado> Empleados { get; set; }
        public virtual ICollection<ParticipanteEstimacion> ParticipanteEstimacions { get; set; }
        public virtual ICollection<TarifarioHora> TarifarioHoras { get; set; }
    }
}
