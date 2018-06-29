import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserItemComponent } from './admin-user-item.component';

describe('AdminUserItemComponent', () => {
  let component: AdminUserItemComponent;
  let fixture: ComponentFixture<AdminUserItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUserItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
