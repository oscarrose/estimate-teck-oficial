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

        [HttpGet("RequerimientoByProyecto/{id}")]
        public async Task<ActionResult<IEnumerable<RequerimientosDTO>>> GetRequerimientos(int id)
        {
            var Requerimientos = await (
                from r in _context.RequerimientosClientes
                join p in _context.Proyectos on r.ProyectoId equals p.ProyectoId
                join tipoReq in _context.TipoRequerimientos on r.TipoRequerimientoId equals tipoReq.TipoRequerimientoId
                join est in _context.EstadoRequerimientos on r.EstadoId equals est.EstadoRequerimientoId
                where r.ProyectoId == id
                select new RequerimientosDTO()
                {
                    RequerimientoId = r.RequerimientoId,
                    ProyectoId = r.ProyectoId,
                    NombreProyecto = p.NombreProyecto,
                    TipoRequerimiento = tipoReq.Nombre,
                    TipoRequerimientoId = r.TipoRequerimientoId,
                    EstadoId=r.EstadoId,
                    Estado=est.NombreEstadoRequerimiento,
                    Descripcion = r.Descripcion,
                    FechaCreacion = p.FechaCreacion,

                }).ToListAsync();


            return Ok(Requerimientos);

        }

        //Metodo para validar si existe o no el requisito

        private bool RequerimientoExists(int IdRequerimiento)
        {
            return (_context.RequerimientosClientes?.Any(c => c.RequerimientoId == IdRequerimiento)).GetValueOrDefault();
        }

        [HttpPost("RegisterRequirement")]
        public async Task<ActionResult<RegisterRequirement>> CreateRequerimiento([FromBody] RegisterRequirement requerimiento)
        {
            if (_context.RequerimientosClientes == null)
            {
                return Problem("Entity set 'estimate_teckContext.RequerimientosClientes' is null.");
            }

            try
            {
                _context.RequerimientosClientes.AddRange(requerimiento.RequerimientosClientes);
                await _context.SaveChangesAsync();

                return Ok(requerimiento);

            }
            catch (Exception)
            {
                throw;
            }
        }




        [HttpPut("PutRequerimientos/{id}")]
        public async Task<IActionResult> PutRequerimientos(int id, [FromBody] RequerimientosCliente requerimientos)
        {

            if (!RequerimientoExists(id))
            {
                return NotFound();
            }
            try
            {

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
