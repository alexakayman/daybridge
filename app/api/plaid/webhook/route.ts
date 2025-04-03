import { NextResponse } from "next/server";
import { PlaidService } from "../../../services/plaid/plaid.service";
import { PlaidWebhookHandler } from "../../../services/plaid/plaid.webhook";

const plaidService = new PlaidService();
const webhookHandler = new PlaidWebhookHandler(plaidService["plaidClient"]);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { webhook_type, webhook_code, item_id, ...webhookData } = body;

    // Verify webhook authenticity here if needed
    // You can implement additional security measures like checking webhook signatures

    await webhookHandler.handleWebhook(
      webhook_type,
      webhook_code,
      item_id,
      webhookData
    );

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Error processing Plaid webhook:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
