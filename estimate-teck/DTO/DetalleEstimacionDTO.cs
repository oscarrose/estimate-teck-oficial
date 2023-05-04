using estimate_teck.Models;
namespace estimate_teck.DTO
{

    public class DetalleEstimacionDTO
    {
        public estimacionView ViewEstimacion { get; set; }
        public estimacionDetalleView ViewEstimacionDetalle { get; set; }

        public List<ComponenteFuncionaleView> viewComponenteFuncional { get; set; } = null;

        public List<ConteoTipoComponenteView> viewConteoTipoComponente { get; set; } = null;

        public List<CaracteristicaSistemaView> viewCaracteristicaSistema { get; set; } = null;

        public List<PuntoFuncionAjustadoView> viewPuntoFuncionAjustado { get; set; } = null;

        public List<ParticipanteEstimacionView> viewParticipanteEstimacion { get; set; } = null;

        public List<ReturnParametrosView> viewParametroEconomico { get; set; } = null;

    }


    public partial class ReturnParametrosView
    {


        public string Itbis { get; set; }
        public string CostoSoporte { get; set; }
        public string CostoImplementacion { get; set; }

        public DateTime? FechaCreacion { get; set; }

    }



    public class ParticipanteEstimacionView
    {
        public string Cargo { get; set; }
        public int CantidadPersona { get; set; }
    }

    public class PuntoFuncionAjustadoView
    {

        public string TipoComponente { get; set; }
        public int Baja { get; set; }
        public int Media { get; set; }
        public int Alta { get; set; }
        public int Total { get; set; }

    }

    public class CaracteristicaSistemaView
    {
        public string Caracteristica { get; set; } = null!;
        public string puntaje { get; set; }

    }

    public class ConteoTipoComponenteView
    {
        public string TipoComponente { get; set; }
        public int Baja { get; set; }
        public int Media { get; set; }
        public int Alta { get; set; }
    }


    public class ComponenteFuncionaleView
    {
        public string RequerimientoSw { get; set; }
        public string TipoComponente { get; set; }
        public string Complejidad { get; set; } = null!;
    }

    public class estimacionView
    {
        public int EstimacionId { get; set; }
        public int ProyectoId { get; set; }
        public string Estado { get; set; }
        public string CreadoPor { get; set; }
        public decimal? FactorAjuste { get; set; }
        public decimal? TotalPuntoFuncionAjustado { get; set; }
        public decimal? TotalPuntoFuncionSinAjustar { get; set; }
        public DateTime? FechaCreacion { get; set; }

    }

    public class estimacionDetalleView
    {
        public int DetalleEstimacionId { get; set; }
        public int EstimacionId { get; set; }
        public int TotalProgramadores { get; set; }
        public decimal EsfuerzoTotal { get; set; }
        public decimal DuracionHoras { get; set; }
        public decimal DuracionDias { get; set; }
        public decimal DuracionMes { get; set; }
        public decimal CostoBrutoEstimado { get; set; }
        public decimal CostoTotal { get; set; }
    }

}