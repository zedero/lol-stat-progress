import { TestBed, inject } from '@angular/core/testing';

import { AnalyzeTeamcompService } from './analyze-teamcomp.service';

describe('AnalyzeTeamcompService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnalyzeTeamcompService]
    });
  });

  it('should ...', inject([AnalyzeTeamcompService], (service: AnalyzeTeamcompService) => {
    expect(service).toBeTruthy();
  }));
});
