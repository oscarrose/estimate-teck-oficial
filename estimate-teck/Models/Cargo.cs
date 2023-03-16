using System;
using System.Collections.Generic;

namespace estimate_teck.Models;

public partial class Cargo
{
    public int CargoId { get; set; }

    public string Nombre { get; set; } = null!;

    public string Descripcion { get; set; } = null!;

    public virtual ICollection<Empleado> Empleados { get; } = new List<Empleado>();

    public virtual ICollection<ParticipanteEstimacion> ParticipanteEstimacions { get; } = new List<ParticipanteEstimacion>();

    public virtual ICollection<TarifarioHora> TarifarioHoras { get; } = new List<TarifarioHora>();
}
