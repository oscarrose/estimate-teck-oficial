using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Text.Json.Serialization;
using JsonIgnoreAttribute = System.Text.Json.Serialization.JsonIgnoreAttribute;

namespace estimate_teck.Models;

public partial class ProductividadPuntoFuncion
{

    public int ProductividadId { get; set; }

    public int UsuarioId { get; set; }

    public int EstadoId { get; set; }

    public string NombrePlataforma { get; set; } = null!;

    public int? NivelBajo { get; set; }

    public int? NivelMedio { get; set; }

    public int? NivelAlto { get; set; }

    public DateTime? FechaCreacion { get; set; }


    [JsonIgnore]
    [IgnoreDataMember]
    public virtual EstadoUsuarioEmpleado? Estado { get; set; } = null!;

    [JsonIgnore]
    [IgnoreDataMember]
    
    public virtual ICollection<Estimacion> Estimacions { get; } = new List<Estimacion>();
    [JsonPropertyName("productvidadpf")]
    [JsonIgnore]
    [IgnoreDataMember]
    public virtual Usuario? Usuario { get; set; } = null!;
}
