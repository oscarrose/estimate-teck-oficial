﻿using estimate_teck.Models;
namespace estimate_teck.DTO
{
    public class RequerimientosClienteDTO
    {

        public int Id { get; set; }
        public int ProyectoId { get; set; }
        public int TipoRequerimientoId { get; set; }
        public int UsuarioId { get; set; }
        public string Requisito { get; set; } = null!;
        // public virtual ICollection<RequerimientoSf> IbarffaaDependientes { get; set; } = null!;
        public List<RequerimientoSf> RequisitoSf { get; set; }
    }

    public class RequerimientoSf
    {
        public int Id { get; set; }
        public string requerimientoSf { get; set; } = null!;
    }
}
