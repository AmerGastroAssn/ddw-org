import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPressReleaseEditComponent } from './admin-press-release-edit.component';

describe('AdminPressReleaseEditComponent', () => {
  let component: AdminPressReleaseEditComponent;
  let fixture: ComponentFixture<AdminPressReleaseEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPressReleaseEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPressReleaseEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
