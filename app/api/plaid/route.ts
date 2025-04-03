import { NextResponse } from "next/server";
import { PlaidService } from "../../services/plaid/plaid.service";

const plaidService = new PlaidService();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, accessToken, startDate, endDate, userId, publicToken } =
      body;

    switch (action) {
      case "getBalance":
        if (!accessToken) {
          return NextResponse.json(
            { error: "Access token is required" },
            { status: 400 }
          );
        }
        const balance = await plaidService.getBalance(accessToken);
        return NextResponse.json({ balance });

      case "getTransactions":
        if (!accessToken || !startDate || !endDate) {
          return NextResponse.json(
            { error: "Access token, start date, and end date are required" },
            { status: 400 }
          );
        }
        const transactions = await plaidService.getTransactions(
          accessToken,
          startDate,
          endDate
        );
        return NextResponse.json({ transactions });

      case "createLinkToken":
        if (!userId) {
          return NextResponse.json(
            { error: "User ID is required" },
            { status: 400 }
          );
        }
        const linkToken = await plaidService.createLinkToken(userId);
        return NextResponse.json({ linkToken });

      case "exchangePublicToken":
        if (!publicToken) {
          return NextResponse.json(
            { error: "Public token is required" },
            { status: 400 }
          );
        }
        const newAccessToken = await plaidService.exchangePublicToken(
          publicToken
        );
        return NextResponse.json({ accessToken: newAccessToken });

      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
  } catch (error) {
    console.error("Plaid API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
