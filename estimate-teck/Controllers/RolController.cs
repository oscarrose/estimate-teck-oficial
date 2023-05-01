using estimate_teck.Data;
using estimate_teck.DTO;
using estimate_teck.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace estimate_teck.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RolController : ControllerBase
    {

        private readonly estimate_teckContext _context;

        public RolController(estimate_teckContext context)
        {
            _context = context;
        }

        [HttpGet("GetAllRols")]
        public async Task<ActionResult<IEnumerable<Rol>>> getAllRols()
        {
            return Ok(await _context.Rols.ToListAsync());
        }


        [HttpPatch("ChangeRolsUser")]
        public async Task<IActionResult> ChangeRolUser([FromBody] changeRol changeRoll)
        {
            var userRol = await _context.Usuarios.FindAsync(changeRoll.IdObj);

            if (userRol == null) return NotFound("Usuario no encontrado");

            try
            {
                var patchDoc = new JsonPatchDocument<Rol>();

                patchDoc.Replace(userRol => userRol.IdRol, changeRoll.IdRol);

                var serializedItemToUpdate = JsonConvert.SerializeObject(patchDoc);
                var deserialized = JsonConvert.DeserializeObject<JsonPatchDocument>(serializedItemToUpdate);
                deserialized?.ApplyTo(userRol);
                
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
