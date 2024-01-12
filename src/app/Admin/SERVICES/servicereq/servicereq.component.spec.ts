import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicereqComponent } from './servicereq.component';

describe('ServicereqComponent', () => {
  let component: ServicereqComponent;
  let fixture: ComponentFixture<ServicereqComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServicereqComponent]
    });
    fixture = TestBed.createComponent(ServicereqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
