export interface PlaidAccount {
  account_id: string;
  balances: {
    available: number | null;
    current: number;
    iso_currency_code: string | null;
    limit: number | null;
    unofficial_currency_code: string | null;
  };
  mask: string;
  name: string;
  official_name: string | null;
  subtype: string | null;
  type: string;
}

export interface PlaidTransaction {
  account_id: string;
  amount: number;
  iso_currency_code: string | null;
  unofficial_currency_code: string | null;
  category: string[] | null;
  category_id: string | null;
  date: string;
  location: {
    address: string | null;
    city: string | null;
    country: string | null;
    lat: number | null;
    lon: number | null;
    postal_code: string | null;
    region: string | null;
    store_number: string | null;
  };
  merchant_name: string | null;
  name: string;
  payment_channel: string;
  pending: boolean;
  transaction_id: string;
  transaction_code: string | null;
}

export interface PlaidApiResponse {
  accounts?: PlaidAccount[];
  transactions?: PlaidTransaction[];
  total_transactions?: number;
  has_more?: boolean;
  next_cursor?: string;
  request_id: string;
}
