import { Component } from '@angular/core';

@Component({
  selector: 'app-casos',
  standalone: true,
  imports: [],
  templateUrl: './casos.component.html',
  styleUrl: './casos.component.css'
})
export class CasosComponent {


  flecha2: boolean = false 



  clickFecha2(){
    this.flecha2 = !this.flecha2;
}
}
