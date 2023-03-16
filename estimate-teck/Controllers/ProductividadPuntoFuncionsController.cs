using estimate_teck.Data;
using estimate_teck.DTO;
using estimate_teck.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace estimate_teck.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductividadPuntoFuncionsController : ControllerBase
    {
        private readonly estimate_teckContext _context;

        public ProductividadPuntoFuncionsController(estimate_teckContext context)
        {
            _context = context;
        }

        // GET: api/ProductividadPuntoFuncions
        [HttpGet("GetAllProductividad")]
        public async Task<ActionResult<IEnumerable<productividadDTO>>> GetProductividadPuntoFuncions()
        {
            if (_context.ProductividadPuntoFuncions == null) return NotFound();

            var AllProductividad = await (
                from p in _context.ProductividadPuntoFuncions
                join u in _context.Usuarios on p.UsuarioId equals u.UsuarioId
                join emp in _context.Empleados on u.EmpleadoId equals emp.EmpleadoId
                join e in _context.EstadoUsuarioEmpleados on p.EstadoId equals e.EstadoId


                select new productividadDTO()
                {
                    ProductividadId = p.ProductividadId,
                    NombrePlataforma = p.NombrePlataforma,
                    NivelBajo = p.NivelBajo,
                    NivelMedio = p.NivelMedio,
                    NivelAlto = p.NivelAlto,
                    FechaCreacion = p.FechaCreacion,
                    Empleado = string.Concat(emp.Nombre, " ", emp.Apellido),
                    Email = emp.Email,

                    EstadoId = p.EstadoId,
                    Estado = e.Estado



                }).ToListAsync();
            return Ok(AllProductividad);


        }


        //metodo para validar si existe la plataforma
        private bool PlataformaProductividadExists(int IdProductividad)
        {
            return (_context.ProductividadPuntoFuncions?.Any(c => c.ProductividadId == IdProductividad)).GetValueOrDefault();

        }

        [HttpPost("CreateProductividad")]
        public async Task<ActionResult<ProductividadPuntoFuncion>> CreateProductividad([FromBody] ProductividadPuntoFuncion productividadpf)
        {
            if (_context.ProductividadPuntoFuncions == null)
            {
                return Problem("Entity set 'estimate_teckContext.ProductividadPuntosFuncion'  is null.");
            }
            if (PlataformaProductividadExists(productividadpf.ProductividadId))
            {
                return BadRequest("Ya esta plataforma esta registrada");
            }

            try
            {
                var createProductividad = new ProductividadPuntoFuncion
                {
                    ProductividadId = productividadpf.ProductividadId,
                    NombrePlataforma = productividadpf.NombrePlataforma,
                    NivelBajo = productividadpf.NivelBajo,
                    NivelMedio = productividadpf.NivelMedio,
                    NivelAlto = productividadpf.NivelAlto,
                    FechaCreacion = productividadpf.FechaCreacion,
                    UsuarioId = 1,
                    EstadoId = 1

                };

                _context.ProductividadPuntoFuncions.Add(createProductividad);
                await _context.SaveChangesAsync();
                var resultUsuario = (_context.Usuarios.Where(u => u.UsuarioId == createProductividad.UsuarioId).FirstOrDefault());
                var resultEmple = (_context.Empleados.Where(e => e.EmpleadoId == resultUsuario.EmpleadoId).FirstOrDefault());
                var resulEstado =(_context.EstadoUsuarioEmpleados.Where(a=>a.EstadoId == createProductividad.EstadoId).FirstOrDefault());

                var resultProductividad = new productividadDTO()
                {
                    ProductividadId = createProductividad.ProductividadId,
                    NombrePlataforma = createProductividad.NombrePlataforma,
                    NivelBajo = createProductividad.NivelBajo,
                    NivelMedio = createProductividad.NivelMedio,
                    NivelAlto = createProductividad.NivelAlto,
                    FechaCreacion = createProductividad.FechaCreacion,
                    Empleado = string.Concat(resultEmple.Nombre, "", resultEmple.Apellido),
                    EstadoId = createProductividad.EstadoId,
                    Estado = resulEstado.Estado,
                    Email = resultEmple.Email

                };

                return Ok(resultProductividad);
            }
            catch (Exception)
            {
                throw;
            }



        }

        // PUT: api/ProductividadPuntoFuncions/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("PutProductividad/{id}")]
        public async Task<IActionResult> PutProductividad(int id, [FromBody] ProductividadPuntoFuncion productividadpf)
        {
            try
            {
                if (!PlataformaProductividadExists(id))
                {
                    return NotFound();
                }

                if (id != productividadpf.ProductividadId)
                {
                    return BadRequest("Datos inconsistente");
                }

                _context.Entry(productividadpf).State = EntityState.Modified;
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception)
            {
                throw;
            }
        }


        //// GET: api/ProductividadPuntoFuncions/5
        //[HttpGet("{id}")]
        //public async Task<ActionResult<ProductividadPuntoFuncion>> GetProductividadPuntoFuncion(int id)
        //{
        //    var productividadPuntoFuncion = await _context.ProductividadPuntoFuncions.FindAsync(id);

        //    if (productividadPuntoFuncion == null)
        //    {
        //        return NotFound();
        //    }

        //    return productividadPuntoFuncion;
        //}

        // PUT: api/ProductividadPuntoFuncions/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutProductividadPuntoFuncion(int id, ProductividadPuntoFuncion productividadPuntoFuncion)
        //{
        //    if (id != productividadPuntoFuncion.ProductividadId)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(productividadPuntoFuncion).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!ProductividadPuntoFuncionExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return NoContent();
        //}

        // POST: api/ProductividadPuntoFuncions
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754

        // DELETE: api/ProductividadPuntoFuncions/5
        //[HttpDelete("{id}")]
        //public async Task<IActionResult> DeleteProductividadPuntoFuncion(int id)
        //{
        //    var productividadPuntoFuncion = await _context.ProductividadPuntoFuncions.FindAsync(id);
        //    if (productividadPuntoFuncion == null)
        //    {
        //        return NotFound();
        //    }

        //    _context.ProductividadPuntoFuncions.Remove(productividadPuntoFuncion);
        //    await _context.SaveChangesAsync();

        //    return NoContent();
        //}

        //private bool ProductividadPuntoFuncionExists(int id)
        //{
        //    return _context.ProductividadPuntoFuncions.Any(e => e.ProductividadId == id);
        //}
    }
}
