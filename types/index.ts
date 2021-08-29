export interface Transaction {
  id: string;
  timestamp: string;
  type: "deposit" | "withdrawal";
  status: "pending" | "completed";
  currency: "BTC" | "CHF" | "USD";
  amount: number;
}

export interface EurRates {
  [id: string]: number | null;
}

export interface TableProps {
  transactions: Transaction[];
  eurRates: EurRates;
}

export interface SpinnerProps {
  loading: boolean;
}
