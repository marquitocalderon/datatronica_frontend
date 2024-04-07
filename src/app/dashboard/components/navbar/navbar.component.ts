import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  constructor(private elementRef: ElementRef) {
    this.checkScreenSize();
  }

  ngOnInit(): void {
    this.showSidebar = !this.showSidebar;
    this.addshowSidebarEvent.emit(this.showSidebar);
    this.checkScreenSize();
  }

  showSidebar: boolean = false;
  //se declara para enviar iformacion al padre, se tiene que indicar que tipo de variable le vamos a pasar
  @Output() addshowSidebarEvent = new EventEmitter<boolean>();
  //creamos un metodo para output
  show() {
    this.showSidebar = !this.showSidebar;
    this.addshowSidebarEvent.emit(this.showSidebar);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize(); // Llamar al método cuando cambie el tamaño de la pantalla
  }

  private checkScreenSize() {
    if (window.innerWidth >= 640) {
      this.show();
    }
  }

  clickOptions2: boolean = false;

  clickOptions() {
    this.clickOptions2 = !this.clickOptions2;
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      // Llamar a la función showSettings() cuando se hace clic fuera del elemento
      if (this.clickOptions2 === true) {
        this.clickOptions();
      }
    }
  }

  salir() : any {
      localStorage.removeItem('token');
      window.location.reload();
  }
}
