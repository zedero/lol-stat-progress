import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummonerGraphsComponent } from './summoner-graphs.component';

describe('SummonerGraphsComponent', () => {
  let component: SummonerGraphsComponent;
  let fixture: ComponentFixture<SummonerGraphsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummonerGraphsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummonerGraphsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
