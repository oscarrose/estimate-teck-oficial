namespace estimate_teck.DTO
{
    public class UsuarioDTO
    {
        public int UsuarioId { get; set; }
        public string emailUsuario{get;set;}=null!;
        public string Empleado { get; set; }=null!;
        public string EstadoUsuario { get; set; }= null!;
        public string Rol { get; set; }= null!;
        public DateTime? FechaCreacion { get; set; }
    }
}