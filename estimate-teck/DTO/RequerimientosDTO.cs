namespace estimate_teck.DTO
{
    public class RequerimientosDTO
    {
        public int RequerimientoId { get; set; }
        public int ProyectoId { get; set; }
        public string? NombreProyecto { get; set; }
        public int TipoRequerimientoId { get; set; }
        public string TipoRequerimiento { get; set; }

         public int EstadoId { get; set; }
        public string Estado { get; set; }
        public string? Descripcion { get; set; }
        public DateTime? FechaCreacion { get; set; }
    }
}
