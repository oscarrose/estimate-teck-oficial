using estimate_teck.DTO;
using estimate_teck.Models;
using estimate_teck.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using Microsoft.EntityFrameworkCore;

namespace estimate_teck.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUsuarioService _usuarioService;
        private readonly IConfiguration _configuration;
        private readonly estimate_teckContext _context;

        public AuthController(estimate_teckContext context,IConfiguration configuration, IUsuarioService usuarioService)
        {
            _configuration = configuration;
            _usuarioService= usuarioService;
            _context = context;
        }


        [HttpGet, Authorize]
        //Por medio de este metodo se pueden visualizar las claims en el controlador
        public ActionResult<string> GetMe()
        {
            var userName = _usuarioService.GetMyName();
            return Ok(userName);
        }

        [HttpPost("RegisterUser")]
        public async Task<IActionResult> RegisterUser([FromBody] RegisterUserDTO userRegister)
        {
             if (_usuarioService.EmployeeHasUser(userRegister.IdEmpleado))
             {
                 return BadRequest("Empleado tiene un usuario asignado");
             }
            try
            {
                CreatePasswordHash( out byte[] passwordHash, out byte[] passwordSalt);

                var usuario = new Usuario
                {
                    PasswordHast = passwordHash,
                    PasswordSalt = passwordSalt,
                    EmpleadoId = userRegister.IdEmpleado,
                    EstadoUsuarioId = 1,
                    IdRol = userRegister.idRol,
                    FechaCreacion = DateTime.Now.ToLocalTime()
                };

                _context.Usuarios.Add(usuario);
                await _context.SaveChangesAsync();

                var resultUserRegister = await (from userSave in _context.Usuarios
                                    join employee in _context.Empleados on userSave.EmpleadoId equals employee.EmpleadoId
                                    join rolUser in _context.Rols on userSave.IdRol equals rolUser.IdRol
                                    where (userSave.UsuarioId == usuario.UsuarioId)
                                    select new UserDTO
                                    {
                                        usuarioId = userSave.UsuarioId,
                                        usuarioEmail=employee.Email,
                                        nombreEmpleado = string.Concat(employee.Nombre, " ", employee.Apellido),
                                        estado = userSave.EstadoUsuario.Estado,
                                        fechaCreacion= userSave.FechaCreacion,
                                        rolUsuario = rolUser.Nombre
                                 
                                    }).FirstOrDefaultAsync();
                return Ok(resultUserRegister);

            }
            catch (Exception)
            {
                throw;
            }


        }

        [HttpPost("Login")]
        [AllowAnonymous]
        public async Task<ActionResult<string>> Login([FromBody] UserLogin user)
        {
            //obtener el empleado que tiene el usuario asignado
            var currentEmployee = _context.Empleados.Where(x => x.Email == user.UserEmail).FirstOrDefault();

            //obtener los datos del usuario
            var currentUser = _context.Usuarios.Where(x => x.EmpleadoId == currentEmployee.EmpleadoId).FirstOrDefault();

            if (currentUser== null ) return BadRequest("Usuario no encontrado");

            if (!_usuarioService.UserActive(currentUser.UsuarioId)) return BadRequest("Usuario acceso denegado");


            if (!VerifyPasswordHash(user.Password, currentUser.PasswordHast, currentUser.PasswordSalt))
            {
                return BadRequest("Contrasena incorrecta");
            }
          
            var currentRol = _context.Rols.Where(x => x.IdRol == currentUser.IdRol).FirstOrDefault();
          
            string token = CreateToken(currentUser);

            return Ok(new
            {
                idUsuario = currentUser.UsuarioId,
                Email = user.UserEmail,
                Rol = currentRol?.Nombre,
                token = token
            });

        }


        /// <summary>
        /// Method for create the token the user
        /// </summary>
        /// <param name="usuario"></param>
        /// <returns></returns>
        private string CreateToken(Usuario usuario)
        {
          
            var currentRol = _context.Rols.Where(x => x.IdRol == usuario.IdRol).FirstOrDefault();
            var currentEmployee = _context.Empleados.Where(x => x.EmpleadoId == usuario.EmpleadoId).FirstOrDefault();

            if (currentRol == null)
            {
                return "Error en obtener el rol que tiene asignado el usuario";
            }

            List<Claim> claims = new List<Claim>
            {

                new Claim(ClaimTypes.Email, currentEmployee.Email),

                new Claim(ClaimTypes.Role, currentRol.Nombre)

            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(
                _configuration.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds);

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);


            return jwt;
        }

        //Para crear el password con hash para usar en el token
        private void CreatePasswordHash( out byte[] passwordHash, out byte[] passwordSalt)
        {
          string  password = "123456";

            using (var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));

            }
        }

        //Verificar el password de hash 
        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] PasswordSalt)
        {
            using (var hmac = new HMACSHA512(PasswordSalt))
            {
                var computeHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computeHash.SequenceEqual(passwordHash);

            }
        }
    }
}
