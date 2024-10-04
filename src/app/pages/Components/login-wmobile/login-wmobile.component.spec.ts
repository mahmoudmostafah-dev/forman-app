import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginWMobileComponent } from './login-wmobile.component';

describe('LoginWMobileComponent', () => {
  let component: LoginWMobileComponent;
  let fixture: ComponentFixture<LoginWMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginWMobileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginWMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
