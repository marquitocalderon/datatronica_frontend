import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilespermisosComponent } from './perfilespermisos.component';

describe('PerfilespermisosComponent', () => {
  let component: PerfilespermisosComponent;
  let fixture: ComponentFixture<PerfilespermisosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilespermisosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PerfilespermisosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
