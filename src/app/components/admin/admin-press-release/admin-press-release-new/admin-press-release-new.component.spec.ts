import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPressReleaseNewComponent } from './admin-press-release-new.component';

describe('AdminPressReleaseNewComponent', () => {
  let component: AdminPressReleaseNewComponent;
  let fixture: ComponentFixture<AdminPressReleaseNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPressReleaseNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPressReleaseNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
