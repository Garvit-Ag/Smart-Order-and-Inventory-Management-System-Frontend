export interface Bill {
  billId: number;
  amount: number;
  paymentMode: 'CASH' | 'CREDIT_CARD' | 'DEBIT_CARD' | 'UPI' | 'NET_BANKING'; // Adapting to your Java Enum
  billingDate: string; // Java LocalDate becomes a string (YYYY-MM-DD)
  billingTime: string; // Java LocalTime becomes a string (HH:mm:ss)
  paymentStatus: 'COMPLETED' | 'PENDING';
}