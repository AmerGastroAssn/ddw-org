import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRegisterPageNewComponent } from './admin-register-page-new.component';

describe('RegisterPageNewComponent', () => {
  let component: AdminRegisterPageNewComponent;
  let fixture: ComponentFixture<AdminRegisterPageNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminRegisterPageNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRegisterPageNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
