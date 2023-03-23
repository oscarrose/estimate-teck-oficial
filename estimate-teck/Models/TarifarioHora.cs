using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace estimate_teck.Models;

public partial class TarifarioHora
{

    public int TarifarioId { get; set; }
    public int CargoId { get; set; }
    public int UsuarioId { get; set; }
    public decimal MontoTarifa { get; set; }
    public DateTime FechaCreacion { get; set; }

    [JsonIgnore]
    [IgnoreDataMember]
    public virtual Cargo? Cargo { get; set; } = null!;
    [JsonPropertyName("Usuario")]
    [JsonIgnore]
    [IgnoreDataMember]
    public virtual Usuario? Usuario { get; set; } = null!;

}
