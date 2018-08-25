import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPressReleaseListComponent } from './admin-press-release-list.component';

describe('AdminPressReleaseListComponent', () => {
  let component: AdminPressReleaseListComponent;
  let fixture: ComponentFixture<AdminPressReleaseListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPressReleaseListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPressReleaseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
