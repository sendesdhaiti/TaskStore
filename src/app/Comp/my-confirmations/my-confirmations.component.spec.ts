import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyConfirmationsComponent } from './my-confirmations.component';

describe('MyConfirmationsComponent', () => {
  let component: MyConfirmationsComponent;
  let fixture: ComponentFixture<MyConfirmationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyConfirmationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyConfirmationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
