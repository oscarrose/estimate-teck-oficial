using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using estimate_teck.Data;
using estimate_teck.Models;
using estimate_teck.DTO;
using estimate_teck.Servicies.Estimate;
using Microsoft.EntityFrameworkCore.Storage;

namespace estimate_teck.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EstimacionsController : ControllerBase
    {
        private readonly estimate_teckContext _context;
        private readonly IEstimate _servicesEstimate;

        public EstimacionsController(estimate_teckContext context, IEstimate servicesEstimate)
        {
            _context = context;
            _servicesEstimate = servicesEstimate;
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

        // public IActionResult countClassificationComponents(ICollection<ComponenteFuncionale> ComponenteFuncionales)
        // {



        //     return Ok(resultado);
        // }

        // POST: api/Estimacions
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("estimarProyectos")]
        public async Task<IActionResult> estimacionProyecto([FromBody] receiveEstimateDTO data)
        {
            using (IDbContextTransaction transaction = _context.Database.BeginTransaction())
            {

                try
                {
                    //agregar componente funcionales clasificados
                    _context.ComponenteFuncionales.AddRangeAsync(data.ComponenteFuncionales);
                    await _context.SaveChangesAsync();

                    //para contar los componentes funcionales
                    // var resultadoCount = data.ComponenteFuncionales.GroupBy(d => new { d.TipoComponenteId, d.ProyectoId })
                    //    .Select(g => new ConteoTipoComponente
                    //    {
                    //        TipoComponenteId = g.Key.TipoComponenteId,
                    //        Baja = g.Count(d => d.Complejidad == "baja"),
                    //        Media = g.Count(d => d.Complejidad == "media"),
                    //        Alta = g.Count(d => d.Complejidad == "alta"),
                    //        ProyectoId = g.Key.ProyectoId
                    //    });
                    ICollection<ConteoTipoComponente> resultadoCount = data.ComponenteFuncionales.GroupBy(d => new { d.TipoComponenteId, d.ProyectoId })
                     .Select(g => new ConteoTipoComponente
                     {
                         TipoComponenteId = g.Key.TipoComponenteId,
                         Baja = g.Count(d => d.Complejidad == "baja"),
                         Media = g.Count(d => d.Complejidad == "media"),
                         Alta = g.Count(d => d.Complejidad == "alta"),
                         ProyectoId = g.Key.ProyectoId
                     }).ToList();

                    await _context.ConteoTipoComponentes.AddRangeAsync(resultadoCount);
                    await _context.SaveChangesAsync();

                    //para guardar las 14 caracteristica generales del sistema
                   await _context.CaracteristicaSistemas.AddRangeAsync(data.CaracteristicaSistemas);
                    await _context.SaveChangesAsync();

                    //calcular el Factor de Ajuste (VAF)
                    double resultVAF = _servicesEstimate.calcularVAF(data.CaracteristicaSistemas);


                    //guardar datos en la tabla Punto funcion ajustado
                    //aqui error  
                     var resultPuntoFuncionAjustado = _servicesEstimate. OrganizarPuntoFuncionAjustado(resultadoCount);

                    await _context.PuntoFuncionAjustados.AddRangeAsync(resultPuntoFuncionAjustado);
                    await _context.SaveChangesAsync();

                    /*
                    Calcular el Total de Puntos Función sin Ajustar (PFSA): 
                    */
                    int totalPFSA = await _context.PuntoFuncionAjustados
                             .Where(p => p.ProyectoId == resultPuntoFuncionAjustado[0].ProyectoId)
                             .SumAsync(p => p.Total);



                    /*calcular Total de Puntos Función Ajustados (PFA)
                     PFA = PFSA * [0.65 + (0.01) * factor de ajuste)]*/
                    double CalcularPFA = totalPFSA * (0.65 + (0.01 * resultVAF));

                    //guardar Productividad de estimacion
                    /*_context.EstimacionProductividad.AddRangeAsync(data.Productividades);*/




                    //guardar datos de la tabla estimacion
                    var estimacion = new Estimacion()
                    {
                        ProyectoId = resultPuntoFuncionAjustado[0].ProyectoId,
                        FactorAjuste = (decimal)resultVAF,
                        TotalPuntoFuncionAjustado = totalPFSA,
                        TotalPuntoFuncionSinAjustar = (decimal)CalcularPFA,
                        DetalleEstimacions = new List<DetalleEstimacion>{
                            new DetalleEstimacion{
                                CostoBrutoEstimado=1,
                                EsfuerzoTotal=1,
                                DuracionDias=1,
                                DuracionHoras=1,
                                CostoTotal=1,
                                DuracionMes=1
                            }
                        }
                    };
                    _context.Estimacions.Add(estimacion);
                    await _context.SaveChangesAsync();

                    transaction.Commit();
                    return NoContent();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    return StatusCode(500, $"Error a realizar la estimación: {ex.Message}");
                }

            }


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
