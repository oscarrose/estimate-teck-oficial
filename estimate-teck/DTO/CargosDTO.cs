namespace estimate_teck.DTO
{
    public class CargosDTO
    {
        public int CargoId { get; set; }
        public string Nombre { get; set; } = null!;
        public decimal SalarioHora { get; set; }
        public string Descripcion { get; set; } = null!;
    }
}
