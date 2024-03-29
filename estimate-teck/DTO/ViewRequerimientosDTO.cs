﻿using estimate_teck.Models;

namespace estimate_teck.DTO
{
    public class ViewRequerimientosDTO
    {

        public int RequerimientoId { get; set; }
        //public int ProyectoId { get; set; }
        public string TipoRequerimiento { get; set; }
        public string Usuario { get; set; }
        public string Requisito { get; set; } = null!;
        // public virtual ICollection<RequerimientoSf> IbarffaaDependientes { get; set; } = null!;
        public List<RequerimientoSf> RequisitoSf { get; set; }

    }

    public class ViewRequerimientoSf
    {
        public int Id { get; set; }
        public string requerimientoSf { get; set; } = null!;
    }
}
