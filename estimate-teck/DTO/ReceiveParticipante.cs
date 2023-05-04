using estimate_teck.Models;

namespace estimate_teck.DTO
{
    
    public class ReceiveParticipante
    {
       public decimal EsfuerzoTotal {get;set;}
        public ICollection<ParticipanteEstimacion>? Listparticipantes { get; set; } = null;

    }
}