namespace estimate_teck.DTO
{
    public class UserDTO
    {
        public int usuarioId { get; set; }
      
        public string emailUsuario { get; set; } = null!;

        public string empleado { get; set; } = null!;

        public string estadoUsuario { get; set; } = null!;

        public DateTime? fechaCreacion { get; set; }

        public string rol { get; set; } = null!;

      
    }
}
