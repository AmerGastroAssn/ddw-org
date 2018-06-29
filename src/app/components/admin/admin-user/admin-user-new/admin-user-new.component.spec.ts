import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserNewComponent } from './admin-user-new.component';

describe('AdminUserNewComponent', () => {
  let component: AdminUserNewComponent;
  let fixture: ComponentFixture<AdminUserNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUserNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
