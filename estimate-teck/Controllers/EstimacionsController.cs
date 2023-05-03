using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using estimate_teck.Data;
using estimate_teck.Models;
using estimate_teck.DTO;
using estimate_teck.Servicies.Estimate;
using Microsoft.EntityFrameworkCore.Storage;
using estimate_teck.Servicies;
using System.Text.Json;

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
        //el id es del proyecto
        [HttpGet("DetalleEstimacion/{id}")]
        public async Task<IActionResult> DetalleEstimacion(int id)
        {
            var HaveEstimate = _servicesEstimate.ExisteProyectoEstimacion(id);
            try
            {

                if (!HaveEstimate)
                {
                    return Ok(false);
                }


                var estimacions = await (
                    from est in _context.Estimacions
                    join estado in _context.EstadoEstimacions on est.EstadoId equals estado.EstadoId
                    join user in _context.Usuarios on est.UsuarioId equals
                    user.UsuarioId
                    join emp in _context.Empleados on user.EmpleadoId equals
                    emp.EmpleadoId
                    where est.ProyectoId == id
                    select new estimacionView()
                    {
                        EstimacionId = est.EstimacionId,
                        ProyectoId = est.ProyectoId,
                        Estado = estado.Estado,
                        CreadoPor = string.Concat(emp.Nombre, " ", emp.Apellido),
                        FactorAjuste = est.FactorAjuste,
                        TotalPuntoFuncionAjustado = est.TotalPuntoFuncionAjustado,
                        TotalPuntoFuncionSinAjustar = est.TotalPuntoFuncionSinAjustar,
                        FechaCreacion = est.FechaCreacion

                    }).FirstOrDefaultAsync();

                var detalleEstimacion = await (
                    from detalle in _context.DetalleEstimacions
                    where detalle.EstimacionId == estimacions.EstimacionId
                    select new estimacionDetalleView()
                    {
                        EsfuerzoTotal = detalle.EsfuerzoTotal,
                        TotalProgramadores = detalle.TotalProgramadores,
                        DuracionMes = detalle.DuracionMes,
                        DuracionDias = detalle.DuracionDias,
                        DuracionHoras = detalle.DuracionHoras,
                        CostoBrutoEstimado = detalle.CostoBrutoEstimado,
                        CostoTotal = detalle.CostoTotal

                    }).FirstOrDefaultAsync();

                var resultComponenteFuncional = await (
                from comp in _context.ComponenteFuncionales
                join req in _context.RequerimientosSoftwares on comp.RequerimientoSwId equals req.Id
                join tipo in _context.TipoComponentes on comp.TipoComponenteId
                equals tipo.TipoComponenteId
                where comp.ProyectoId == id
                select new ComponenteFuncionaleView()
                {
                    RequerimientoSw = req.RequerimientoSf,
                    TipoComponente = tipo.NombreComponente,
                    Complejidad = comp.Complejidad
                }).ToListAsync();

                var resultConteoTipoComponente = await (
                    from conteo in _context.ConteoTipoComponentes
                    join tipo in _context.TipoComponentes on conteo.TipoComponenteId equals tipo.TipoComponenteId
                    where conteo.ProyectoId == id
                    select new ConteoTipoComponenteView()
                    {
                        TipoComponente = tipo.NombreComponente,
                        Baja = conteo.Baja,
                        Media = conteo.Media,
                        Alta = conteo.Alta
                    }).ToListAsync();

                var resultCaracteristicaSistema = await (
                                  from caract in _context.CaracteristicaSistemas
                                  join puntaje in _context.PuntajeCaracteristicas on caract.Idpuntaje equals puntaje.IdPuntaje
                                  where caract.ProyectoId == id
                                  select new CaracteristicaSistemaView()
                                  {
                                      Caracteristica = caract.Caracteristica,
                                      puntaje = string.Concat("Significado:", puntaje.Significado," ", "valor:", puntaje.Valor)

                                  }).ToListAsync();

                    var resultPuntoFuncionAjustado=await(
                        from puntos in _context.PuntoFuncionAjustados
                        join tipo in _context.TipoComponentes on puntos.TipoComponenteId equals tipo.TipoComponenteId
                        where puntos.ProyectoId==id
                        select new PuntoFuncionAjustadoView(){
                            TipoComponente=tipo.NombreComponente,
                            Baja=puntos.Baja,
                            Media=puntos.Media,
                            Alta=puntos.Alta,
                            Total=puntos.Total
                        }).ToListAsync();



                var detalleEstimacionDTO = new DetalleEstimacionDTO
                {
                    ViewEstimacion = estimacions,
                    ViewEstimacionDetalle = detalleEstimacion,
                    viewComponenteFuncional = resultComponenteFuncional,
                    viewConteoTipoComponente = resultConteoTipoComponente,
                    viewCaracteristicaSistema = resultCaracteristicaSistema,
                    viewPuntoFuncionAjustado=resultPuntoFuncionAjustado

                };


                return Ok(detalleEstimacionDTO);


            }
            catch (System.Exception)
            {

                throw;
            }


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
                // if (!EstimacionExists(id))
                // {
                //     return NotFound();
                // }
                // else
                // {
                //     throw;
                // }
            }

            return NoContent();
        }



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
                    var resultPuntoFuncionAjustado = _servicesEstimate.OrganizarPuntoFuncionAjustado(resultadoCount);

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


                    //Calcular las horas hombre por cada plataforma de desarrollo. 
                    //Formula--- Esfuerzo (en horas hombre) = PF ajustado * Productividad por punto de función
                    var resultProductividad = _servicesEstimate.calcularTheProductividad(data.Productividades, CalcularPFA);

                    //El esfuerzo total en horas hombre se calcula sumando las horas hombre necesarias para desarrollar el software en cada plataforma de desarrollo
                    decimal EsfuerzoTotal = resultProductividad.Select(r => r.EsfuerzoProductividad).Sum();

                    //--Esta no:El total del esfuerzo dividido entre las horas mes trabajo
                    //Esta si:la suma de los programadores totales por productividad
                    int numeroProgramadores = resultProductividad.Select(x => x.ProgramadoresProductividad).Sum();

                    //Finalmente, para calcular la duración del proyecto en horas laborables, en días y meses, se divide el esfuerzo en horas hombre por el número de programadores y se convierte a días y meses utilizando un promedio de 8 horas laborales al día y 22 días laborales al mes. En este caso, se tiene:
                    //474 horas/hombre / 2.96 programadores = 160.13 horas laborales 
                    //160.13 horas laborales / 8 horas/día = 20.02 días 
                    //20.02 días / 22 días/mes = 0.91 meses
                    decimal duracionHoras = Math.Round(EsfuerzoTotal / numeroProgramadores);
                    decimal duracionDias = Math.Round(duracionHoras / Constantes.trabajaraHoraDía);

                    decimal duracionMes = (duracionDias / Constantes.diasPorMes);

                    //guardar datos de la tabla estimacion
                    var estimacion = new Estimacion()
                    {
                        ProyectoId = resultPuntoFuncionAjustado[0].ProyectoId,
                        FactorAjuste = (decimal)resultVAF,
                        EstadoId = 1,
                        UsuarioId = data.UsuarioId,
                        TotalPuntoFuncionAjustado = totalPFSA,
                        TotalPuntoFuncionSinAjustar = (decimal)CalcularPFA,
                        EstimacionProductividads = resultProductividad,
                        DetalleEstimacions = new List<DetalleEstimacion>{
                            new DetalleEstimacion{
                                TotalProgramadores=numeroProgramadores,
                                CostoBrutoEstimado=0,//null
                                EsfuerzoTotal=EsfuerzoTotal,
                                DuracionDias=duracionDias,
                                DuracionHoras=duracionHoras,
                                CostoTotal=0,//null
                                DuracionMes=duracionMes
                            }
                        }
                    };
                    _context.Estimacions.Add(estimacion);
                    await _context.SaveChangesAsync();

                    // _context.EstimacionProductividads.AddRange(resultProductividad);
                    //   await _context.SaveChangesAsync();

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


    }
}
