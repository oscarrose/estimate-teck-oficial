using estimate_teck.Models;
namespace estimate_teck.DTO
{

    public class DetalleEstimacionDTO
    {
        public estimacionView ViewEstimacion { get; set; }
        public estimacionDetalleView ViewEstimacionDetalle { get; set; }

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
        public decimal EsfuerzoTotal { get; set; }
        public decimal DuracionHoras { get; set; }
        public decimal DuracionDias { get; set; }
        public decimal DuracionMes { get; set; }
        public decimal CostoBrutoEstimado { get; set; }
        public decimal CostoTotal { get; set; }
    }

}