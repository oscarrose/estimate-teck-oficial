using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using estimate_teck.Data;
using estimate_teck.Models;
using estimate_teck.DTO;

namespace estimate_teck.Controllers

{
    [Route("api/[controller]")]
    [ApiController]
    public class TarifarioHorasController : ControllerBase
    {
        private readonly estimate_teckContext _context;
        public TarifarioHorasController(estimate_teckContext context)
        {
            _context = context;
        }

        // GET: api/TarifarioHoras
        [HttpGet ("GetAllTarifarioHora")]
        public async Task<ActionResult<IEnumerable<TarifarioHoraDTO>>> GetAllTarifarioHora()
        {
            if (_context.TarifarioHoras == null) return NotFound();

            var AllTarifarioHora = await (
               from T in _context.TarifarioHoras
               from user in _context.Usuarios
               join cgo in _context.Cargos on T.CargoId equals cgo.CargoId
               join E in _context.Empleados on user.EmpleadoId equals E.EmpleadoId

               select new TarifarioHoraDTO()
               {

                   TarifarioId = T.TarifarioId,
                   UsuarioId= T.UsuarioId,
                   CargoId = T.CargoId,
                   CargoName = cgo.NombreCargo,
                   EmpleadoId = T.EmpleadoId,
                   MontoTarifa = T.MontoTarifa,

                   EmpleadoName= string.Concat(E.Nombre, " ", E.Apellido),
                   FechaCreacion = T.FechaCreacion


               }).ToListAsync();
            return Ok(AllTarifarioHora);

        }
        //metodo para validar si existe la plataforma
        private bool TarifarioHoraExists(int IdTarifario)
        {
            return (_context.TarifarioHoras?.Any(c => c.TarifarioId == IdTarifario)).GetValueOrDefault();

        }

        // POST: api/TarifarioHoras
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("CreateTarifarioHora")]
        public async Task<ActionResult<TarifarioHora>> CreateTarifario([FromBody] TarifarioHora T)
        {
            if (_context.TarifarioHoras == null)
            {
                return Problem("Entity set 'estimate_teckContext.TarifarioHoras'  is null.");
            }
            if (TarifarioHoraExists(T.TarifarioId))
            {
                return BadRequest("La tarifa por hora de este usuario esta registrada");
            }

            try
            {
                var createTarifarioHora = new TarifarioHora
                {
                    TarifarioId = T.TarifarioId,
                    UsuarioId= T.UsuarioId,
                    CargoId = T.CargoId,
                    EmpleadoId = T.EmpleadoId,
                    MontoTarifa = T.MontoTarifa,
                    FechaCreacion = DateTime.Now,
                    
               
                };

                _context.TarifarioHoras.Add(createTarifarioHora);
                await _context.SaveChangesAsync();
                //var resultUsuario = (_context.Usuarios.Where(U => U.UsuarioId == createTarifarioHora.UsuarioId).FirstOrDefault());
                var resultCargo = (_context.Cargos.Where(cgo => cgo.CargoId == createTarifarioHora.CargoId).FirstOrDefault());
                var resultEmple = (_context.Empleados.Where(e=>e.EmpleadoId == createTarifarioHora.EmpleadoId).FirstOrDefault());


                var resultTarifario = new TarifarioHoraDTO()
                {
                    TarifarioId = createTarifarioHora.TarifarioId,
                    FechaCreacion=createTarifarioHora.FechaCreacion,
                    UsuarioId= createTarifarioHora.UsuarioId,
                    CargoId = createTarifarioHora.CargoId,
                    CargoName=resultCargo.NombreCargo,
                    EmpleadoId = createTarifarioHora.EmpleadoId,
                    EmpleadoName = string.Concat(resultEmple.Nombre, " ", resultEmple.Apellido),
                    MontoTarifa = createTarifarioHora.MontoTarifa


                };

                return Ok(resultTarifario);
            }
            catch (Exception)
            {
                throw;
            }






        }



        // GET: api/TarifarioHoras/5
        // [HttpGet("{id}")]
        //public async Task<ActionResult<TarifarioHora>> GetTarifarioHora(int id)
        //{
        //  var tarifarioHora = await _context.TarifarioHoras.FindAsync(id);

        //if (tarifarioHora == null)
        //{
        //  return NotFound();
        //}

        //return tarifarioHora;
        //}

        // PUT: api/TarifarioHoras/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("PutTarifarioHora/{id}")]
        public async Task<IActionResult> PutTarifarioHora(int id, TarifarioHora tarifarioHora)
        {
            if (id != tarifarioHora.TarifarioId)
            {
                return BadRequest();
            }

            _context.Entry(tarifarioHora).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TarifarioHoraExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }
     

        // DELETE: api/TarifarioHoras/5
        //[HttpDelete("{id}")]
        //public async Task<IActionResult> DeleteTarifarioHora(int id)
        //{
        //var tarifarioHora = await _context.TarifarioHoras.FindAsync(id);
        //if (tarifarioHora == null)
        //{
        //  return NotFound();
        //}

        //_context.TarifarioHoras.Remove(tarifarioHora);
        //await _context.SaveChangesAsync();

        //return NoContent();
        //}

        // private bool TarifarioHoraExists(int id)
        //{
        //  return _context.TarifarioHoras.Any(e => e.TarifarioId == id);
        //}
    }
}
