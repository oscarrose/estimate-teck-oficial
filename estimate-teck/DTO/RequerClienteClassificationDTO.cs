namespace estimate_teck.DTO
{
    public class RequerClienteClassificationDTO{

        public int RequerimientoId { get; set; }
        public string Requisito { get; set; } = null!;
        // public virtual ICollection<RequerimientoSf> IbarffaaDependientes { get; set; } = null!;
        public List<RequerimientoSf> RequisitoSf { get; set; }
    }
    
}