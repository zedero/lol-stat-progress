import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TankItemizerComponent } from './tank-itemizer.component';

describe('TankItemizerComponent', () => {
  let component: TankItemizerComponent;
  let fixture: ComponentFixture<TankItemizerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TankItemizerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TankItemizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
