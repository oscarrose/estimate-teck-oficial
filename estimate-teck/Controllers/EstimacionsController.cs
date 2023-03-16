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
    public class EstimacionsController : ControllerBase
    {
        private readonly estimate_teckContext _context;

        public EstimacionsController(estimate_teckContext context)
        {
            _context = context;
        }

        // GET: api/Estimacions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Estimacion>>> GetEstimacions()
        {
            return await _context.Estimacions.ToListAsync();
        }

        // GET: api/Estimacions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Estimacion>> GetEstimacion(int id)
        {
            var estimacion = await _context.Estimacions.FindAsync(id);

            if (estimacion == null)
            {
                return NotFound();
            }

            return estimacion;
        }

        // PUT: api/Estimacions/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEstimacion(int id, Estimacion estimacion)
        {
            if (id != estimacion.EstimacionId)
            {
                return BadRequest();
            }

            _context.Entry(estimacion).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EstimacionExists(id))
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

        // POST: api/Estimacions
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Estimacion>> PostEstimacion(Estimacion estimacion)
        {
            _context.Estimacions.Add(estimacion);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEstimacion", new { id = estimacion.EstimacionId }, estimacion);
        }

        // DELETE: api/Estimacions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEstimacion(int id)
        {
            var estimacion = await _context.Estimacions.FindAsync(id);
            if (estimacion == null)
            {
                return NotFound();
            }

            _context.Estimacions.Remove(estimacion);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EstimacionExists(int id)
        {
            return _context.Estimacions.Any(e => e.EstimacionId == id);
        }
    }
}
