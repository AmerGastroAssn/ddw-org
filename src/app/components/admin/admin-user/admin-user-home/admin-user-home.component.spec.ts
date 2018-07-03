import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserHomeComponent } from './admin-user-home.component';

describe('AdminUserHomeComponent', () => {
  let component: AdminUserHomeComponent;
  let fixture: ComponentFixture<AdminUserHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUserHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
