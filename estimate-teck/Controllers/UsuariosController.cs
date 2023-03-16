using estimate_teck.Data;
using estimate_teck.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using estimate_teck.DTO;
using Newtonsoft.Json;
using Microsoft.AspNetCore.JsonPatch;

namespace estimate_teck.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private readonly IUsuarioService _usuarioService;
        private readonly estimate_teckContext _context;

        public UsuariosController(estimate_teckContext context, IUsuarioService usuarioService)
        {
            _usuarioService = usuarioService;
            _context = context;
        }
        // GET: Todos los usuarios registrados
        [HttpGet("GetAllUsuarios")]
        public async Task<ActionResult<IEnumerable<UsuarioDTO>>> getAllUsuarios()
        {
            if (_context.Usuarios == null) return NotFound();
            var allUsuarios = await (
                from u in _context.Usuarios
                join e in _context.Empleados on u.EmpleadoId equals e.EmpleadoId
                select new UsuarioDTO()
                {
                    UsuarioId = u.UsuarioId,
                    Empleado = string.Concat(e.Nombre, " ", e.Apellido),
                    emailUsuario = e.Email,
                    Rol = u.IdRolNavigation.Nombre,
                    EstadoUsuario = u.EstadoUsuario.Estado,
                    FechaCreacion = u.FechaCreacion


                }).ToListAsync();
            return Ok(allUsuarios);
        }

       
        [HttpGet("GetAllRol")]
        public async Task<ActionResult<IEnumerable<Rol>>> getAllRol()
        {

            return Ok(await _context.Rols.ToListAsync());
        }

        /// <summary>
        /// method for change status the user
        /// </summary>
        /// <param name="changeState"></param>
        /// <returns></returns>
        // Patch: api/Usuarios/ChangeState
        [HttpPatch("ChangeStatusUser")]
        public async Task<IActionResult> ChangeStatusUser([FromBody] changeStatus changeStatu)
        {
            var user = await _context.Usuarios.FindAsync(changeStatu.IdObjectivo);

            if (user == null) return NotFound("Usuario no encontrado");

            try
            {
                var patchDoc = new JsonPatchDocument<Usuario>();

                patchDoc.Replace(user => user.EstadoUsuarioId, changeStatu.IdEstado);

                var serializedItemToUpdate = JsonConvert.SerializeObject(patchDoc);
                var deserialized = JsonConvert.DeserializeObject<JsonPatchDocument>(serializedItemToUpdate);
                deserialized?.ApplyTo(user);

                await _context.SaveChangesAsync();
                return NoContent();

            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }


        }


        /// <summary>
        /// method for reset password user
        /// </summary>
        /// <param name="resetPasswordUser"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        // Patch: api/Usuarios/id
        [HttpPatch("resetPasswordUser")]
        public async Task<IActionResult> resetPasswordUser([FromBody] resetPassword dataPassword)
        {
            var user = await _context.Usuarios.FindAsync(dataPassword.userId);
            if (user == null) return NotFound("Usuario no encontrado");

            try
            {
                _usuarioService.CreatePasswordHash(dataPassword.newPassword,out byte[] passwordHash, out byte[] passwordSalt);

                var patchDoc = new JsonPatchDocument<Usuario>();
                patchDoc.Replace(user => user.PasswordHast, passwordHash);
                patchDoc.Replace(user => user.PasswordSalt, passwordSalt);

                var serializedItemToUpdate = JsonConvert.SerializeObject(patchDoc);
                var deserialized = JsonConvert.DeserializeObject<JsonPatchDocument>(serializedItemToUpdate);
                deserialized?.ApplyTo(user);

                await _context.SaveChangesAsync();
                return NoContent();

            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }


        }


        /// <summary>
        /// method for change password user
        /// </summary>
        /// <param name="changePasswordUser"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        // Patch: api/Usuarios/id
        [HttpPatch("changePasswordUser")]
        public async Task<IActionResult> changePasswordUser([FromBody] changePassword dataPassword)
        {
            var currentUser = await _context.Usuarios.FindAsync(dataPassword.userId);

            if (currentUser == null) return NotFound("Usuario no encontrado");

            if (dataPassword.newPassword != dataPassword.confirmPassword) return NotFound("Contraseña no coinciden");


            if (!_usuarioService.VerifyPasswordHash(dataPassword.oldPassword, currentUser.PasswordHast, currentUser.PasswordSalt))
            {
                return BadRequest("contraseña anterior incorrecta");
            }

            try
            {
                _usuarioService.CreatePasswordHash(dataPassword.newPassword,out byte[] passwordHash, out byte[] passwordSalt);

                var patchDoc = new JsonPatchDocument<Usuario>();
                patchDoc.Replace(user => user.PasswordHast, passwordHash);
                patchDoc.Replace(user => user.PasswordSalt, passwordSalt);

                var serializedItemToUpdate = JsonConvert.SerializeObject(patchDoc);
                var deserialized = JsonConvert.DeserializeObject<JsonPatchDocument>(serializedItemToUpdate);
                deserialized?.ApplyTo(currentUser);

                await _context.SaveChangesAsync();
                return NoContent();

            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }


        }
    }



}