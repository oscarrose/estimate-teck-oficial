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
            return (_context.Usuarios?.Any(e => e.UsuarioId == id)).GetValueOrDefault();
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

      public void CreatePasswordHash(out byte[] passwordHash, out byte[] passwordSalt)
        {
             string password = "123456";

            using (var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));

            }
        }

       
    }
}
