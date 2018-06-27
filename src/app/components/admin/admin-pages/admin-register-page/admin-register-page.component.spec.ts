import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRegisterPageComponent } from './admin-register-page.component';

describe('RegisterPageComponent', () => {
  let component: AdminRegisterPageComponent;
  let fixture: ComponentFixture<AdminRegisterPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminRegisterPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRegisterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
