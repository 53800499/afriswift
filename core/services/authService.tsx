interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  pays: string;
  motDePasse: string;
}

interface LoginData {
  email: string;
  motDePasse: string;
}

interface RegisterResponse {
  success: boolean;
  message: string;
  data?: any;
}

interface LoginResponse {
  success: boolean;
  message: string;
  data?: any;
  token?: string;
}

export const authService = {
  async register(userData: RegisterData): Promise<RegisterResponse> {
    try {
      // URL de votre API backend - à modifier selon votre configuration
      const apiUrl = "http://192.168.4.30:3000/api/users/inscription";
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(userData),
      });
      

      const result = await response.json();

      if (response.ok) {
        return {
          success: true,
          message: 'Inscription réussie',
          data: result
        };
      } else {
        return {
          success: false,
          message: result.message || 'Erreur lors de l\'inscription',
          data: result
        };
      }
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      return {
        success: false,
        message: 'Erreur de connexion. Veuillez réessayer.',
      };
    }
  },

  async login(loginData: LoginData): Promise<LoginResponse> {
    try {
      // URL de votre API backend - à modifier selon votre configuration
      const apiUrl = 'http://192.168.4.30:3000/api/users/connexion';
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(loginData),
      });

      const result = await response.json();

      if (response.ok) {
        return {
          success: true,
          message: 'Connexion réussie',
          data: result,
          token: result.token
        };
      } else {
        return {
          success: false,
          message: result.message || 'Email ou mot de passe incorrect',
          data: result
        };
      }
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      return {
        success: false,
        message: 'Erreur de connexion. Veuillez réessayer.',
      };
    }
  },

  // Fonction pour valider le format de l'email
  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // Fonction pour valider le format du téléphone
  validatePhone(phone: string): boolean {
    // Supprime tous les caractères non numériques sauf le +
    const cleanPhone = phone.replace(/[^\d+]/g, '');
    // Vérifie que le téléphone commence par + et a au moins 10 chiffres
    return cleanPhone.startsWith('+') && cleanPhone.length >= 12;
  },

  // Fonction pour valider le mot de passe
  validatePassword(password: string): boolean {
    return password.length >= 6;
  }
};
