import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailAddressInputComponent } from './mail-address-input.component';

describe('MailAddressInputComponent', () => {
  let component: MailAddressInputComponent;
  let fixture: ComponentFixture<MailAddressInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MailAddressInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MailAddressInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
