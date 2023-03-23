namespace estimate_teck.DTO
{
    public class productividadDTO
    {
        public int ProductividadId { get; set; }
        public string Empleado { get; set; } = null!;
        public string NombrePlataforma { get; set; } = null!;
        public int? NivelBajo { get; set; }
        public int? NivelMedio { get; set; }
        public int? NivelAlto { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public string Email { get; set; } = null!;

        public int EstadoId { get; set;}
        public string Estado { get; set; }

    }
}
