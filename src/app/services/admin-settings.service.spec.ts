import { TestBed, inject } from '@angular/core/testing';

import { AdminSettingsService } from './admin-settings.service';

describe('AdminSettingsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminSettingsService]
    });
  });

  it('should be created', inject([AdminSettingsService], (service: AdminSettingsService) => {
    expect(service).toBeTruthy();
  }));
});
