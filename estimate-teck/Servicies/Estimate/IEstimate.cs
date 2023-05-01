using estimate_teck.Models;
using estimate_teck.DTO;
namespace estimate_teck.Servicies.Estimate

{
    public interface IEstimate
    {
        List<EstimacionProductividad> calcularTheProductividad(ICollection<Productividad> productividades, double CalcularPFA);
        List<PuntoFuncionAjustado> OrganizarPuntoFuncionAjustado(ICollection<ConteoTipoComponente> conteos);


        double calcularVAF(ICollection<CaracteristicaSistema> caracteristicaSistemas);
    }

}