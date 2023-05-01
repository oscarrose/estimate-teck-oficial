using estimate_teck.Models;

namespace estimate_teck.DTO
{
    public class receiveEstimateDTO
    {
        public virtual ICollection<Productividad> Productividades { get; set;} = null!;
        public virtual ICollection<ComponenteFuncionale> ComponenteFuncionales { get; set; }
        public virtual ICollection<CaracteristicaSistema> CaracteristicaSistemas { get; set; }

    }

    public class Productividad
    {
        public int ProductividadId { get; set; }
    }

}