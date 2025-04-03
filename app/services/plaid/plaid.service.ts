import {
  Configuration,
  PlaidApi,
  PlaidEnvironments,
  Products,
  CountryCode,
} from "plaid";

export class PlaidService {
  private plaidClient: PlaidApi;

  constructor() {
    const configuration = new Configuration({
      basePath: PlaidEnvironments[process.env.PLAID_ENV || "sandbox"],
      baseOptions: {
        headers: {
          "PLAID-CLIENT-ID": process.env.PLAID_CLIENT_ID,
          "PLAID-SECRET": process.env.PLAID_SECRET,
        },
      },
    });

    this.plaidClient = new PlaidApi(configuration);
  }

  async getBalance(accessToken: string) {
    try {
      const response = await this.plaidClient.accountsBalanceGet({
        access_token: accessToken,
      });
      return response.data.accounts;
    } catch (error) {
      console.error("Error fetching balance:", error);
      throw error;
    }
  }

  async getTransactions(
    accessToken: string,
    startDate: string,
    endDate: string
  ) {
    try {
      const response = await this.plaidClient.transactionsGet({
        access_token: accessToken,
        start_date: startDate,
        end_date: endDate,
        options: {
          count: 100,
          offset: 0,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching transactions:", error);
      throw error;
    }
  }

  async createLinkToken(userId: string) {
    try {
      const response = await this.plaidClient.linkTokenCreate({
        user: { client_user_id: userId },
        client_name: "Daybridge",
        products: [Products.Transactions],
        country_codes: [CountryCode.Us],
        language: "en",
      });
      return response.data.link_token;
    } catch (error) {
      console.error("Error creating link token:", error);
      throw error;
    }
  }

  async exchangePublicToken(publicToken: string) {
    try {
      const response = await this.plaidClient.itemPublicTokenExchange({
        public_token: publicToken,
      });
      return response.data.access_token;
    } catch (error) {
      console.error("Error exchanging public token:", error);
      throw error;
    }
  }
}
