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
    public class ProductividadPuntoFuncionsController : ControllerBase
    {
        private readonly estimate_teckContext _context;

        public ProductividadPuntoFuncionsController(estimate_teckContext context)
        {
            _context = context;
        }

        // GET: api/ProductividadPuntoFuncions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductividadPuntoFuncion>>> GetProductividadPuntoFuncions()
        {
            return await _context.ProductividadPuntoFuncions.ToListAsync();
        }

        // GET: api/ProductividadPuntoFuncions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductividadPuntoFuncion>> GetProductividadPuntoFuncion(int id)
        {
            var productividadPuntoFuncion = await _context.ProductividadPuntoFuncions.FindAsync(id);

            if (productividadPuntoFuncion == null)
            {
                return NotFound();
            }

            return productividadPuntoFuncion;
        }

        // PUT: api/ProductividadPuntoFuncions/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProductividadPuntoFuncion(int id, ProductividadPuntoFuncion productividadPuntoFuncion)
        {
            if (id != productividadPuntoFuncion.ProductividadId)
            {
                return BadRequest();
            }

            _context.Entry(productividadPuntoFuncion).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductividadPuntoFuncionExists(id))
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

        // POST: api/ProductividadPuntoFuncions
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ProductividadPuntoFuncion>> PostProductividadPuntoFuncion(ProductividadPuntoFuncion productividadPuntoFuncion)
        {
            _context.ProductividadPuntoFuncions.Add(productividadPuntoFuncion);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProductividadPuntoFuncion", new { id = productividadPuntoFuncion.ProductividadId }, productividadPuntoFuncion);
        }

        // DELETE: api/ProductividadPuntoFuncions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProductividadPuntoFuncion(int id)
        {
            var productividadPuntoFuncion = await _context.ProductividadPuntoFuncions.FindAsync(id);
            if (productividadPuntoFuncion == null)
            {
                return NotFound();
            }

            _context.ProductividadPuntoFuncions.Remove(productividadPuntoFuncion);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductividadPuntoFuncionExists(int id)
        {
            return _context.ProductividadPuntoFuncions.Any(e => e.ProductividadId == id);
        }
    }
}
