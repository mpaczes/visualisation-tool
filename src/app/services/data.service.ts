import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Order, OrderBookSnapshot } from '../models/trading-data.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private dataUrl = 'assets/data/trading-data.json';

  constructor(private http: HttpClient) {}

  getTradingData(): Observable<OrderBookSnapshot[]> {
    return this.http.get<any[]>(this.dataUrl).pipe(
      map((data: any[]) => {
        const orderBookSnapshots: OrderBookSnapshot[] = [];

        for (const tradingData of data) {
          const orderBookSnapshot: OrderBookSnapshot = { timestamp: '', bids: [], asks: [] };
          orderBookSnapshot.timestamp = tradingData['Time'];
          orderBookSnapshot.asks = this.createOrders(tradingData, 'Ask');
          orderBookSnapshot.bids = this.createOrders(tradingData, 'Bid');
          orderBookSnapshots.push(orderBookSnapshot);
        }

        return orderBookSnapshots;
      }))
  }

  private createOrders(tradingData: any, type: 'Ask' | 'Bid'): Order[] {
    const orders: Order[] = [];

    for (let index = 1; index <= 10; index++) {
      const order: Order = { price: 0, quantity: 0, totalAmount: 0 };
      order.price = tradingData[`${type}${index}`];
      order.quantity = tradingData[`${type}${index}Size`];
      order.totalAmount = Math.round(order.price * order.quantity);
      orders.push(order);
    }

    return orders;
  }
}
