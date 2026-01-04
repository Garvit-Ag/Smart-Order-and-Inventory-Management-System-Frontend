export interface OrderTable {
  orderId: number;
  userId: number;
  address: string;
  amount: number;
  status: 'INITIATED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  orderDate: string;
}

export interface OrderItem {
  orderItemId: number;
  orderId: number;
  productId: number;
  quantity: number;
  priceAtPurchase: number;
}