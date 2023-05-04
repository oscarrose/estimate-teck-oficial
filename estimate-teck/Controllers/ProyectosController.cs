using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using estimate_teck.Data;
using estimate_teck.Models;

namespace estimate_teck.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProyectosController : ControllerBase
    {
        private readonly estimate_teckContext _context;

        public ProyectosController(estimate_teckContext context)
        {
            _context = context;
        }


        // GET: api/Proyectos
        [HttpGet("listProject")]
        public async Task<ActionResult<IEnumerable<Proyecto>>> GetProyectos()
        {
            var listProject = await (
                from p in _context.Proyectos
                join c in _context.Clientes on p.ClienteId equals c.ClienteId
                join u in _context.Usuarios on p.UsuarioId equals u.UsuarioId
                join employee in _context.Empleados on u.EmpleadoId equals employee.EmpleadoId
                join e in _context.EstadoProyectos on p.EstadoProyectoId equals e.EstadoProyectoId
                select new Proyecto()
                {
                    ProyectoId = p.ProyectoId,
                    NombreProyecto = p.NombreProyecto,
                    TipoProyecto=p.TipoProyecto,
                    TipoAplicacion=p.TipoAplicacion,
                    Cliente = new Cliente() { NombreCliente = c.NombreCliente },
                    EstadoProyecto = new EstadoProyecto()
                    {
                        NombreEstadoProyecto = e.NombreEstadoProyecto
                    },
                    Usuario = new Usuario() { Empleado = employee },
                    Descripcion = p.Descripcion,
                    FechaCreacion = p.FechaCreacion
                }).ToListAsync();
            return listProject;
        }

        // GET: api/Proyectos/5
        [HttpGet("oneProject/{id}")]
        public async Task<IActionResult> oneProject(int id)
        {
            var project = await (from proj in _context.Proyectos
                                 where proj.ProyectoId == id
                                 select new
                                 {
                                     proj.ProyectoId,
                                     proj.NombreProyecto,
                                     proj.TipoProyecto,
                                     proj.EstadoProyectoId,
                                     proj.Cliente,
                                     proj.Cliente.Tipo.NombreTipoCliente,
                                     proj.UsuarioId,
                                     proj.FechaCreacion,
                                     proj.Descripcion,
                                     proj.ClienteId,
                                     proj.TipoAplicacion
                                 }).FirstOrDefaultAsync();

            if (project == null)
            {
                return NotFound();
            }

            return Ok(project);
        }

        // PUT: api/Proyectos/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("updateProject/{id}")]
        public async Task<IActionResult> PutProyecto(int id, Proyecto proyecto)
        {

            if (!ProyectoExists(id))
            {
                return NotFound();
            }
            try
            {
                _context.Entry(proyecto).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (DbUpdateConcurrencyException)
            {

                throw;
            }


        }

        // POST: api/Proyectos
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("RegisterProject")]
        public async Task<ActionResult<Proyecto>> PostProyecto(Proyecto proyecto)
        {
            try
            {
                _context.Proyectos.Add(proyecto);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception)
            {

                throw;
            }
        }

        // DELETE: api/Proyectos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProyecto(int id)
        {
            var proyecto = await _context.Proyectos.FindAsync(id);
            if (proyecto == null)
            {
                return NotFound();
            }

            _context.Proyectos.Remove(proyecto);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProyectoExists(int id)
        {
            return _context.Proyectos.Any(e => e.ProyectoId == id);
        }
    }
}
