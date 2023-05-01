using estimate_teck.Models;
using estimate_teck.Data;
using estimate_teck.DTO;
using estimate_teck.Servicies;

namespace estimate_teck.Servicies.Estimate
{
    public class EstimateServices : IEstimate
    {
        private readonly estimate_teckContext _context;
        public EstimateServices(estimate_teckContext context)
        {
            _context = context;
        }

        public List<EstimacionProductividad> calcularTheProductividad(ICollection<Productividad> productividades, double CalcularPFA)
        {
            var resultProductividad = new List<EstimacionProductividad>();
            foreach (var item in productividades)
            {
                int? mediaProductividad = _context.ProductividadPuntoFuncions
                .Where(p => p.ProductividadId == item.ProductividadId)
                .Select(x => x.NivelMedio)
                .SingleOrDefault();

                decimal esfuerzoProductividad = (decimal)(CalcularPFA * mediaProductividad);

                int programadoresProductividad = (int)(esfuerzoProductividad / Constantes.horaMesTrabajo);
                programadoresProductividad = programadoresProductividad <= 0 ? 1 : programadoresProductividad;
                var productividad = new EstimacionProductividad()
                {
                    ProductividadId = item.ProductividadId,
                    EsfuerzoProductividad = esfuerzoProductividad,
                    ProgramadoresProductividad=programadoresProductividad
                };
                resultProductividad.Add(productividad);
            }

            return resultProductividad;
        }

        public double calcularVAF(ICollection<CaracteristicaSistema> caracteristicaSistemas)
        {
            int totalValor = (from cs in caracteristicaSistemas
                              join pc in _context.PuntajeCaracteristicas on cs.Idpuntaje equals pc.IdPuntaje
                              select pc.Valor).Sum();

            double resultVSF = 0.65 + (0.01 * totalValor);
            return resultVSF;
        }


        public List<PuntoFuncionAjustado> OrganizarPuntoFuncionAjustado(ICollection<ConteoTipoComponente> conteos)
        {
            // var resultPuntoFuncionAjustado = new PuntoFuncionAjustado();
            var resultPuntoFuncionAjustado = new List<PuntoFuncionAjustado>();

            foreach (var item in conteos)
            {
                int baja = item.Baja;
                int media = item.Media;
                int alta = item.Alta;
                int TipoComponenteId = item.TipoComponenteId;

                switch (TipoComponenteId)
                {
                    case 1:
                        baja *= 3;
                        media *= 3;
                        alta *= 6;
                        break;
                    case 2:
                        baja *= 4;
                        media *= 5;
                        alta *= 7;
                        break;
                    case 3:
                        baja *= 3;
                        media *= 4;
                        alta *= 6;
                        break;
                    case 4:
                        baja *= 7;
                        media *= 10;
                        alta *= 15;
                        break;
                    case 5:
                        baja *= 5;
                        media *= 7;
                        alta *= 10;
                        break;
                    default:
                        throw new ArgumentException($"Tipo de componente inválido: {TipoComponenteId}");
                }

                var puntoFuncionAjustado = new PuntoFuncionAjustado()
                {
                    TipoComponenteId = TipoComponenteId,
                    Baja = baja,
                    Media = media,
                    Alta = alta,
                    Total = baja + media + alta,
                    ProyectoId = item.ProyectoId
                };
                resultPuntoFuncionAjustado.Add(puntoFuncionAjustado);
                // resultPuntoFuncionAjustado.TipoConponenteId = TipoComponenteId;
                // resultPuntoFuncionAjustado.Baja = baja;
                // resultPuntoFuncionAjustado.Media = media;
                // resultPuntoFuncionAjustado.Alta = alta;
                // 
                // resultPuntoFuncionAjustado.ProyectoId = item.ProyectoId;
            }

            return resultPuntoFuncionAjustado;
        }
    }


}