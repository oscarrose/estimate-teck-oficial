namespace estimate_teck.DTO
{

    public class changePassword
    {
        public int userId { get; set; }
        public string newPassword { get; set; } = null!;
        public string confirmPassword { get; set; } = null!;
        public string oldPassword { get; set; } = null!;

    }
}