/** @format */

export interface BankAccountData {
  bankAccountNumber: string;
  bankAccountType: string;
  bankName: string;
  bankBranch: string;
  bankClearingCode: string;
}


export const bankService = {
  async createBankAccount(data: BankAccountData, token?: string | null) {
    const response = await fetch(
      "http://192.168.4.30:3000/api/users/bank-details",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify(data)
      }
    );
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }
    return response.json();
  }
};
