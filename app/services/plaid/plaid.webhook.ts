import { PlaidApi } from "plaid";

export class PlaidWebhookHandler {
  private plaidClient: PlaidApi;

  constructor(plaidClient: PlaidApi) {
    this.plaidClient = plaidClient;
  }

  async handleWebhook(
    webhookType: string,
    webhookCode: string,
    itemId: string,
    webhookData: any
  ) {
    try {
      switch (webhookType) {
        case "TRANSACTIONS":
          await this.handleTransactionWebhook(webhookCode, itemId, webhookData);
          break;
        case "ITEM":
          await this.handleItemWebhook(webhookCode, itemId, webhookData);
          break;
        default:
          console.log(`Unhandled webhook type: ${webhookType}`);
      }
    } catch (error) {
      console.error("Error handling Plaid webhook:", error);
      throw error;
    }
  }

  private async handleTransactionWebhook(
    webhookCode: string,
    itemId: string,
    webhookData: any
  ) {
    switch (webhookCode) {
      case "INITIAL_UPDATE":
        // Handle initial transaction update
        console.log("Initial transaction update received");
        break;
      case "HISTORICAL_UPDATE":
        // Handle historical transaction update
        console.log("Historical transaction update received");
        break;
      case "DEFAULT_UPDATE":
        // Handle default transaction update
        console.log("Default transaction update received");
        break;
      case "TRANSACTIONS_REMOVED":
        // Handle removed transactions
        console.log("Transactions removed notification received");
        break;
      default:
        console.log(`Unhandled transaction webhook code: ${webhookCode}`);
    }
  }

  private async handleItemWebhook(
    webhookCode: string,
    itemId: string,
    webhookData: any
  ) {
    switch (webhookCode) {
      case "ERROR":
        // Handle item error
        console.log("Item error notification received");
        break;
      case "PENDING_EXPIRATION":
        // Handle pending expiration
        console.log("Item pending expiration notification received");
        break;
      case "USER_PERMISSION_REVOKED":
        // Handle user permission revoked
        console.log("User permission revoked notification received");
        break;
      default:
        console.log(`Unhandled item webhook code: ${webhookCode}`);
    }
  }
}
