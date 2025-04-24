import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TimeNavigationComponent } from './time-navigation.component';
import { By } from '@angular/platform-browser';

describe('TimeNavigationComponent', () => {
  let component: TimeNavigationComponent;
  let fixture: ComponentFixture<TimeNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TimeNavigationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TimeNavigationComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the correct index on onPrevious when currentIndex > 0', () => {
    component.timestamps = ['2023-01-01', '2023-01-02'];
    component.currentIndex = 1;
    spyOn(component.navigate, 'emit');

    component.onPrevious();

    expect(component.navigate.emit).toHaveBeenCalledWith(0);
  });

  it('should not emit on onPrevious when currentIndex === 0', () => {
    component.timestamps = ['2023-01-01', '2023-01-02'];
    component.currentIndex = 0;
    spyOn(component.navigate, 'emit');

    component.onPrevious();

    expect(component.navigate.emit).not.toHaveBeenCalled();
  });

  it('should emit the correct index on onNext when currentIndex < timestamps.length - 1', () => {
    component.timestamps = ['2023-01-01', '2023-01-02'];
    component.currentIndex = 0;
    spyOn(component.navigate, 'emit');

    component.onNext();

    expect(component.navigate.emit).toHaveBeenCalledWith(1);
  });

  it('should not emit on onNext when currentIndex === timestamps.length - 1', () => {
    component.timestamps = ['2023-01-01', '2023-01-02'];
    component.currentIndex = 1;
    spyOn(component.navigate, 'emit');

    component.onNext();

    expect(component.navigate.emit).not.toHaveBeenCalled();
  });
});
