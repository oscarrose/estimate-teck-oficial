using estimate_teck.Data;
using estimate_teck.DTO;
using estimate_teck.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query.Internal;

namespace estimate_teck.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RequerimientosClientesController : ControllerBase
    {
        private readonly estimate_teckContext _context;

        public RequerimientosClientesController(estimate_teckContext context)
        {
            _context = context;
        }

        [HttpGet("GetAllRequerimientos")]
        public async Task<ActionResult<IEnumerable<RequerimientosDTO>>> GetRequerimientos()
        {
            var AllRequerimientos = await (
                from r in _context.RequerimientosClientes
                join p in _context.Proyectos on r.ProyectoId equals p.ProyectoId 


                select new RequerimientosDTO()
                {
                    RequerimientoId= r.RequerimientoId,
                    ProyectoId= r.ProyectoId,
                    NombreProyecto= p.NombreProyecto,
                    TipoRequerimiento= r.TipoRequerimiento,
                    Descripcion= r.Descripcion,
                    FechaCreacion= p.FechaCreacion,
                   
                    
                }).ToListAsync();
            return Ok(AllRequerimientos);

        }

        //Metodo para validar si existe o no el requisito

        private bool RequerimientoExists(int IdRequerimiento)
        {
            return (_context.RequerimientosClientes?.Any(c => c.RequerimientoId== IdRequerimiento)).GetValueOrDefault();
        }

        [HttpPost("CreateRequerimiento")]
        public async Task<ActionResult<RequerimientosCliente>> CreateRequerimiento([FromBody] RequerimientosCliente requerimiento)
        {
            if (_context.RequerimientosClientes == null)
            {
                return Problem("Entity set 'estimate_teckContext.ProductividadPuntosFuncion'  is null.");

            }

            if (RequerimientoExists(requerimiento.RequerimientoId))
            {
                return BadRequest("Ya esta plataforma esta registrada");
            }

            try
            {
                var createRequerimiento = new RequerimientosCliente
                {
                    RequerimientoId = requerimiento.RequerimientoId,
                    ProyectoId = requerimiento.ProyectoId,
                    TipoRequerimiento = requerimiento.TipoRequerimiento,
                    Descripcion= requerimiento.Descripcion,
                    FechaCreacion = requerimiento.FechaCreacion
                };

                _context.RequerimientosClientes.Add(createRequerimiento);
                await _context.SaveChangesAsync();
                var resultProyecto = (_context.Proyectos.Where(p => p.ProyectoId == createRequerimiento.ProyectoId).FirstOrDefault());

                var resultRequerimiento = new RequerimientosDTO()
                {
                    RequerimientoId = createRequerimiento.RequerimientoId,
                    ProyectoId = createRequerimiento.ProyectoId,
                    NombreProyecto = resultProyecto.NombreProyecto,
                    TipoRequerimiento = createRequerimiento.TipoRequerimiento,
                    Descripcion = createRequerimiento.Descripcion,
                    FechaCreacion = createRequerimiento.FechaCreacion
                };
                return Ok(resultRequerimiento);

            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPut("PutRequerimientos/{id}")]
        public async Task<IActionResult> PutRequerimientos(int id, [FromBody] RequerimientosCliente requerimientos)
        {
            try
            {
                if (!RequerimientoExists(id))
                {
                    return NotFound();
                }

                if (id != requerimientos.RequerimientoId)
                {
                    return BadRequest("Datos inconsistente");
                }

                _context.Entry(requerimientos).State = EntityState.Modified;
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
