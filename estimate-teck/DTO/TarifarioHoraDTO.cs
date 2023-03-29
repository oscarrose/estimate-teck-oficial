namespace estimate_teck.Controllers
{
    public class TarifarioHoraDTO
    {
        public TarifarioHoraDTO()
        {
        }

        public int TarifarioId { get; set; }
        public int CargoId { get; set; }
        public string CargoName { get; set; }
        public int UsuarioId { get; set; }
        public string EmpleadoName { get; set; } = string.Empty;
        public decimal MontoTarifa { get; set; }
        public DateTime FechaCreacion { get; set; }
    }
}