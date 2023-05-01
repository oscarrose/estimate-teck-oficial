using estimate_teck.Data;
using estimate_teck.DTO;
using estimate_teck.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace estimate_teck.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CargosController : ControllerBase
    {
        private readonly estimate_teckContext _context;

        public CargosController(estimate_teckContext context)
        {
            _context = context;
        }


        // GET:/api​/Cargos​/GetAllCargos
        [HttpGet("GetAllCargos")]
        public async Task<ActionResult<IEnumerable<CargosDTO>>> GetCargos()
        {

            if (_context.ProductividadPuntoFuncions == null) return NotFound();

            var AllCargos = await (
                from c in _context.Cargos

                select new CargosDTO()
                {
                    CargoId = c.CargoId,
                    Nombre = c.NombreCargo,
                    SalarioHora = c.SalarioHora,
                    Descripcion = c.Descripcion,
                    CreadoPor = c.CreadoPor,
                    FechaCreacion = c.FechaCreacion,
                }).ToListAsync();
            return Ok(AllCargos);


        }

        //metodo para validar si existe la plataforma
        private bool CargoExists(int IdCargo)
        {
            return (_context.Cargos?.Any(c => c.CargoId == IdCargo)).GetValueOrDefault();

        }


        // POST​:​/api​/Cargos​/CreateCargos
        [HttpPost("CreateCargos")]
        public async Task<ActionResult<Cargo>> CreateCargo([FromBody] Cargo cargo)
        {
            if (_context.Cargos == null)
            {
                return Problem("Entity set 'estimate_teckContext.Cargos'  is null.");
            }
            if (CargoExists(cargo.CargoId))
            {
                return BadRequest("Ya este cargo está registrado");
            }

            try
            {
                var createCargo = new Cargo
                {
                    CargoId = cargo.CargoId,
                    NombreCargo = cargo.NombreCargo,
                    SalarioHora = cargo.SalarioHora,
                    Descripcion = cargo.Descripcion,
                    CreadoPor = cargo.CreadoPor,
                    FechaCreacion = cargo.FechaCreacion,

                };

                _context.Cargos.Add(createCargo);
                await _context.SaveChangesAsync();


                return Ok(createCargo);
            }

            catch (Exception)
            {
                throw;
            }
       
        }

        //PUT:​/api​/Cargos​/PutCargos
        [HttpPut("PutCargos/{id}")]
        public async Task<IActionResult> PutCargos(int id, [FromBody] Cargo cargo)
        {
            try
            {
                if (!CargoExists(id))
                {
                    return NotFound();
                }

                if (id != cargo.CargoId)
                {
                    return BadRequest("Datos inconsistente");
                }

                _context.Entry(cargo).State= EntityState.Modified;
                await _context.SaveChangesAsync();
                return NoContent();
            }

            catch (Exception)
            {
                throw;
            }
        }


 

    }
}
