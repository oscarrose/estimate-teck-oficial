using estimate_teck.Data;
using estimate_teck.DTO;
using estimate_teck.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query.Internal;
using Microsoft.EntityFrameworkCore.Storage;

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

        // [HttpGet("RequerimientoByProyecto/{id}")]
        // public async Task<ActionResult<IEnumerable<RequerimientosDTO>>> GetRequerimientos(int id)
        // {
        //     var Requerimientos = await (
        //         from r in _context.RequerimientosClientes
        //         join p in _context.Proyectos on r.ProyectoId equals p.ProyectoId
        //         join tipoReq in _context.TipoRequerimientos on r.TipoRequerimientoId equals tipoReq.TipoRequerimientoId
        //         join est in _context.EstadoRequerimientos on r.EstadoId equals est.EstadoRequerimientoId
        //         where r.ProyectoId == id
        //         select new RequerimientosDTO()
        //         {
        //             RequerimientoId = r.RequerimientoId,
        //             ProyectoId = r.ProyectoId,
        //             NombreProyecto = p.NombreProyecto,
        //             TipoRequerimiento = tipoReq.Nombre,
        //             TipoRequerimientoId = r.TipoRequerimientoId,
        //             EstadoId = r.EstadoId,
        //             Estado = est.NombreEstadoRequerimiento,

        //             FechaCreacion = p.FechaCreacion,

        //         }).ToListAsync();
        //     return Ok(Requerimientos);

        // }


        [HttpGet("SWRequerimentsForEstimate/{id}")]
        public async Task<ActionResult<IEnumerable<RequerimientosSoftware>>> GetSWRequerimientForEstimate(int id)
        {
            try
            {
                var Requerimientos = await (
                   from requirClient in _context.RequerimientosClientes
                   where requirClient.ProyectoId == id && requirClient.EstadoId == 2
                   orderby requirClient.RequerimientoId
                   select new RequerimientosClienteDTO()
                   {
                       RequerimientoId = requirClient.RequerimientoId,
                       Requisito = requirClient.Requisito,
                       RequisitoSf = requirClient.RequerimientosSoftwares.Select(rs => new RequerimientoSf
                       {
                           Id = rs.Id,
                           requerimientoSf = rs.RequerimientoSf
                       }).ToList()
                   }).ToListAsync();
                return Ok(Requerimientos);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al obtener los requerimientos: {ex.Message}");
            }
        }
        //Metodo para validar si existe o no el requisito
        private bool RequerimientoExists(int IdRequerimiento)
        {
            return (_context.RequerimientosClientes?.Any(c => c.RequerimientoId == IdRequerimiento)).GetValueOrDefault();
        }

        [HttpPost("RegisterRequirement")]
        public async Task<IActionResult> CreateRequerimiento([FromBody] List<RequerimientosClienteDTO> requerimientos)
        {
            if (_context.RequerimientosClientes == null)
            {
                return Problem("Entity set 'estimate_teckContext.RequerimientosClientes' is null.");
            }

            using (IDbContextTransaction transaction = _context.Database.BeginTransaction())
            {
                var requerimientosClientes = new List<RequerimientosCliente>();

                foreach (var requerimiento in requerimientos)
                {
                    requerimientosClientes.Add(new RequerimientosCliente
                    {
                        ProyectoId = requerimiento.ProyectoId,
                        TipoRequerimientoId = requerimiento.TipoRequerimientoId,
                        UsuarioId = requerimiento.UsuarioId,
                        Requisito = requerimiento.Requisito,
                        RequerimientosSoftwares = requerimiento.RequisitoSf
                                                    .Select(r => new RequerimientosSoftware
                                                    {
                                                        RequerimientoSf = r.requerimientoSf
                                                    }).ToList()
                    });
                }
                try
                {
                    await _context.RequerimientosClientes.AddRangeAsync(requerimientosClientes);
                    await _context.SaveChangesAsync();
                    transaction.Commit();
                    return NoContent();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    return StatusCode(500, $"Error al crear los requerimientos: {ex.Message}");
                }
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
