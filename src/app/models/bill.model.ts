export interface Bill {
  billId: number;
  amount: number;
  paymentMode: 'CASH' | 'CREDIT_CARD' | 'DEBIT_CARD' | 'UPI' | 'NET_BANKING';
  billingDate: string;
  billingTime: string;
  paymentStatus: 'COMPLETED' | 'PENDING';
}