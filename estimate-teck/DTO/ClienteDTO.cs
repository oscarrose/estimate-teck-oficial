namespace estimate_teck.DTO
{
    public class ClienteDTO
    {
        public int ClienteId { get; set; }
        public int TipoId { get; set; }
        public string Tipo { get; set; } = null!;
        public string NombreCompleto { get; set; } = null!;
          public string NombreCliente { get; set; } = null!;
        public string Nombre { get; set; } = null!;
        public string Apellido { get; set; } = null!;
        public string Identificacion { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string? TelefonoResidencial { get; set; }
        public string Celular { get; set; } = null!;
        public string Pais { get; set; } = null!;
        public string Estadop { get; set; } = null!;
        public string Ciudad { get; set; } = null!;
        public string Direccion { get; set; } = null!;
        public int Usuario { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public string Empleado { get; set; } = null!;
    }
}
