import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSummonerComponent } from './select-summoner.component';

describe('SelectSummonerComponent', () => {
  let component: SelectSummonerComponent;
  let fixture: ComponentFixture<SelectSummonerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectSummonerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectSummonerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
