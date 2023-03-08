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
    public class TarifarioHorasController : ControllerBase
    {
        private readonly estimate_teckContext _context;

        public TarifarioHorasController(estimate_teckContext context)
        {
            _context = context;
        }

        // GET: api/TarifarioHoras
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TarifarioHora>>> GetTarifarioHoras()
        {
            return await _context.TarifarioHoras.ToListAsync();
        }

        // GET: api/TarifarioHoras/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TarifarioHora>> GetTarifarioHora(int id)
        {
            var tarifarioHora = await _context.TarifarioHoras.FindAsync(id);

            if (tarifarioHora == null)
            {
                return NotFound();
            }

            return tarifarioHora;
        }

        // PUT: api/TarifarioHoras/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
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

        // POST: api/TarifarioHoras
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TarifarioHora>> PostTarifarioHora(TarifarioHora tarifarioHora)
        {
            _context.TarifarioHoras.Add(tarifarioHora);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTarifarioHora", new { id = tarifarioHora.TarifarioId }, tarifarioHora);
        }

        // DELETE: api/TarifarioHoras/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTarifarioHora(int id)
        {
            var tarifarioHora = await _context.TarifarioHoras.FindAsync(id);
            if (tarifarioHora == null)
            {
                return NotFound();
            }

            _context.TarifarioHoras.Remove(tarifarioHora);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TarifarioHoraExists(int id)
        {
            return _context.TarifarioHoras.Any(e => e.TarifarioId == id);
        }
    }
}
