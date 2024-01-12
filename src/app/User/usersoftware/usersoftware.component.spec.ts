import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersoftwareComponent } from './usersoftware.component';

describe('UsersoftwareComponent', () => {
  let component: UsersoftwareComponent;
  let fixture: ComponentFixture<UsersoftwareComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersoftwareComponent]
    });
    fixture = TestBed.createComponent(UsersoftwareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
