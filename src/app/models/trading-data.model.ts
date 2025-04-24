export interface Order {
  price: number;
  quantity: number;
  totalAmount: number
}

export interface OrderBookSnapshot {
  timestamp: string;
  bids: Order[];
  asks: Order[];
}
