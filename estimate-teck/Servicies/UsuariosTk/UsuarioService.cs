using estimate_teck.Data;
using System.Security.Claims;
using System.Security.Cryptography;

namespace estimate_teck.Servicies.UsuariosTk
{
    public class UsuarioService:IUsuarioService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly estimate_teckContext _context;
        public UsuarioService(estimate_teckContext context,IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            _context = context;
        }

        public bool EmployeeHasUser(int id)
        {
            return (_context.Usuarios?.Any(e => e.EmpleadoId == id)).GetValueOrDefault();
        }

        public string GetMyName()
        {
            var result = string.Empty;
            if (_httpContextAccessor.HttpContext != null)
            {
                result = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Email);
            }

            return result;  
        }

        public bool UserActive(int userId)
        {
            return (_context.Usuarios?.Any(e => e.UsuarioId == userId && e.EstadoUsuarioId == 1)).GetValueOrDefault();
        }

      public void CreatePasswordHash(string password,out byte[] passwordHash, out byte[] passwordSalt)
        {
             

            using (var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));

            }
        }

        //Verificar el password de hash 
        public bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] PasswordSalt)
        {
            using (var hmac = new HMACSHA512(PasswordSalt))
            {
                var computeHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computeHash.SequenceEqual(passwordHash);

            }
        }
    }
}
