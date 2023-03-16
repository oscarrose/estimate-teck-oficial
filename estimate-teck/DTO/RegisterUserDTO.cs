namespace estimate_teck.DTO
{
    public class RegisterUserDTO
    {
        public int idRol { get; set; }
        public int IdEmpleado { get; set; }
        public string newPassword { get; set; } = null!;
    }
}
