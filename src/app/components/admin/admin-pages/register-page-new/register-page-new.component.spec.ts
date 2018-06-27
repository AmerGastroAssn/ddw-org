import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPageNewComponent } from './register-page-new.component';

describe('RegisterPageNewComponent', () => {
  let component: RegisterPageNewComponent;
  let fixture: ComponentFixture<RegisterPageNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterPageNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPageNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
