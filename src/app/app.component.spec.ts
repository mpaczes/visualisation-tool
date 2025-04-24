import { of, Subject } from "rxjs";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { DataService } from "./services/data.service";
import { ReplayService } from "./services/replay.service";
import { OrderBookSnapshot } from "./models/trading-data.model";
import { TimeNavigationComponent } from "./components/time-navigation/time-navigation.component";
import { OrderBookComponent } from "./components/order-book/order-book.component";

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockDataService: jasmine.SpyObj<DataService>;
  let mockReplayService: jasmine.SpyObj<ReplayService>;
  let replaySubject: Subject<number>;

  beforeEach(() => {
    mockDataService = jasmine.createSpyObj('DataService', ['getTradingData']);
    mockReplayService = jasmine.createSpyObj('ReplayService', ['getReplayObservable', 'startReplay', 'stopReplay']);
    replaySubject = new Subject<number>();

    TestBed.configureTestingModule({
      declarations: [AppComponent, TimeNavigationComponent, OrderBookComponent],
      providers: [
        { provide: DataService, useValue: mockDataService },
        { provide: ReplayService, useValue: mockReplayService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    mockDataService.getTradingData.and.returnValue(of([
      { timestamp: '123', bids: [{ price: 0, quantity: 0, totalAmount: 0 }], asks: [{ price: 0, quantity: 0, totalAmount: 0 }] },
      { timestamp: '456', bids: [{ price: 0, quantity: 0, totalAmount: 0 }], asks: [{ price: 0, quantity: 0, totalAmount: 0 }] }
    ] as OrderBookSnapshot[]));

    mockReplayService.getReplayObservable.and.returnValue(replaySubject.asObservable());
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize tradingData and currentSnapshot on ngOnInit', () => {
    component.ngOnInit();
    expect(component.tradingData).toEqual([
      { timestamp: '123', bids: [{ price: 0, quantity: 0, totalAmount: 0 }], asks: [{ price: 0, quantity: 0, totalAmount: 0 }] },
      { timestamp: '456', bids: [{ price: 0, quantity: 0, totalAmount: 0 }], asks: [{ price: 0, quantity: 0, totalAmount: 0 }] }
    ]);
    expect(component.currentSnapshot).toEqual({
      timestamp: '123',
      bids: [{ price: 0, quantity: 0, totalAmount: 0 }],
      asks: [{ price: 0, quantity: 0, totalAmount: 0 }]
    });
  });

  it('should update currentIndex and currentSnapshot on replay observable', () => {
    component.ngOnInit();
    replaySubject.next(1);
    expect(component.currentIndex).toBe(1);
    expect(component.currentSnapshot).toEqual({
      timestamp: '456',
      bids: [{ price: 0, quantity: 0, totalAmount: 0 }],
      asks: [{ price: 0, quantity: 0, totalAmount: 0 }]
    });
  });

  it('should unsubscribe from subscriptions on ngOnDestroy', () => {
    component.ngOnInit();
    spyOn(component.tradingDataSubscription, 'unsubscribe');
    spyOn(component.replaySubscription, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.tradingDataSubscription.unsubscribe).toHaveBeenCalled();
    expect(component.replaySubscription.unsubscribe).toHaveBeenCalled();
  });

  it('should navigate to the correct index and update currentSnapshot on onNavigate', () => {
    component.ngOnInit();
    component.onNavigate(1);
    expect(component.currentIndex).toBe(1);
    expect(component.currentSnapshot).toEqual({
      timestamp: '456',
      bids: [{ price: 0, quantity: 0, totalAmount: 0 }],
      asks: [{ price: 0, quantity: 0, totalAmount: 0 }]
    });
  });

  it('should call startReplay with the correct length on onStartReplay', () => {
    component.ngOnInit();
    component.onStartReplay();
    expect(mockReplayService.startReplay).toHaveBeenCalledWith(2);
  });

  it('should call stopReplay on onStopReplay', () => {
    component.onStopReplay();
    expect(mockReplayService.stopReplay).toHaveBeenCalled();
  });

  it('should return timestamps from getTimestamps', () => {
    component.ngOnInit();
    const timestamps = component.getTimestamps();
    expect(timestamps).toEqual(['123', '456']);
  });
});
