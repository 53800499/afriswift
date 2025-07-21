export const transactionService = {
  async depotBancaireStellar(montantXOF: number, token?: string) {
    const response = await fetch("http://192.168.43.201:3000/api/transactions/depot-bancaire-stellar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      body: JSON.stringify({ montantXOF })
    });
    if (!response.ok) throw new Error("Erreur lors du dépôt bancaire");
    return response.json();
  },

  async envoyerXLM(destinataireNumeroCompte: string, montantXOF: number, token?: string) {
    const response = await fetch("http://192.168.43.201:3000/api/transactions/envoyer-xlm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      body: JSON.stringify({ 
        destinataireNumeroCompte, 
        montantXOF 
      })
    });
    if (!response.ok) throw new Error("Erreur lors de l'envoi XLM");
    return response.json();
  },

  async retraitStellarBancaire(montantXOF: number, token?: string) {
    const response = await fetch("http://192.168.43.201:3000/api/transactions/retrait-stellar-bancaire", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      body: JSON.stringify({ montantXOF })
    });
    if (!response.ok) throw new Error("Erreur lors du retrait bancaire");
    return response.json();
  }
}; 