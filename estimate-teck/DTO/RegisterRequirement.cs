using estimate_teck.Models;

namespace estimate_teck.DTO
{
    public class RegisterRequirement
    {
         public RegisterRequirement()
        {
            RequerimientosClientes = new HashSet<RequerimientosCliente>();
        }
    
        public virtual ICollection<RequerimientosCliente> RequerimientosClientes { get; set; } = null!;
    }
}
