export const userService = {
  async getUserByPublicKey(publicKey: string, token?: string | null) {
    const response = await fetch(
      `http://192.168.43.201:3000/api/users/utilisateur-by-compte/${publicKey}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        }
      }
    );
    if (!response.ok) throw new Error("Utilisateur non trouvé");
    return response.json();
  }
}; 