interface TransactionResult {
   id: string;
   type: TransactionResultType;
   subject: string;
   source: string;
   spec_version: string;
   time: number;
   data: Data;
   datacontenttype: string;
}

type TransactionResultType =
   | "SALE_APPROVED"
   | "SALE_REJECTED"
   | "VOID_APPROVED"
   | "VOID_REJECTED";

interface Data {
   payment_id: string;
   merchant_id: string;
   created_at: Date;
   amount: Amount;
   card: Card;
   user_id: string;
   payment_method: string;
   metadata: Metadata;
}

interface Amount {
   total: number;
   taxes: Tax[];
   tip: number;
}

interface Tax {
   base: number;
   type: string;
   value: number;
}

interface Card {
   capture_mode: string;
   franchise: string;
   cardholder_name: string;
   terminal_id: string;
}

interface Metadata {
   reference: unknown;
}
