import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPressReleaseDetailsComponent } from './admin-press-release-details.component';

describe('AdminPressReleaseDetailsComponent', () => {
  let component: AdminPressReleaseDetailsComponent;
  let fixture: ComponentFixture<AdminPressReleaseDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPressReleaseDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPressReleaseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
