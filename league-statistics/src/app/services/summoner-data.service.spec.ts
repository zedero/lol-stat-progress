import { TestBed, inject } from '@angular/core/testing';

import { SummonerDataServiceService } from './summoner-data-service.service';

describe('SummonerDataServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SummonerDataServiceService]
    });
  });

  it('should ...', inject([SummonerDataServiceService], (service: SummonerDataServiceService) => {
    expect(service).toBeTruthy();
  }));
});
