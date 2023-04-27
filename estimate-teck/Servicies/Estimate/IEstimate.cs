using estimate_teck.Models;
namespace estimate_teck.Servicies.Estimate

{
    public interface IEstimate
    {
       List <PuntoFuncionAjustado> OrganizarPuntoFuncionAjustado(ICollection<ConteoTipoComponente> conteos);


        double calcularVAF(ICollection<CaracteristicaSistema> caracteristicaSistemas);
    }

}