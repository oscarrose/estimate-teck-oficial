﻿namespace estimate_teck.DTO
{
    public class empleadoDto
    {
        public int EmpleadoId { get; set; }
        public string Estado { get; set; } = null!;
        public int EstadoId { get; set; }
        public string Cargo { get; set; } = null!;
        public int CargoId { get; set; }
        public string Nombre { get; set; } = null!;
       public string Apellido { get; set; } = null!;
        public string Identificacion { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string? TelefonoResidencial { get; set; }
        public string Celular { get; set; } = null!;
        public string Pais { get; set; } = null!;
        public string Provincia { get; set; } = null!;
        public string Direccion { get; set; } = null!;
        public DateTime? FechaCreacion { get; set; }
    }
}
