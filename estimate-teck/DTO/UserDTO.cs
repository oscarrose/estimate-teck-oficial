namespace estimate_teck.DTO
{
    public class UserDTO
    {
        public int usuarioId { get; set; }
      
        public string usuarioEmail { get; set; } = null!;

        public string nombreEmpleado { get; set; } = null!;

        public string estado { get; set; } = null!;

        public DateTime? fechaCreacion { get; set; }

        public string rolUsuario { get; set; } = null!;

      
    }
}
