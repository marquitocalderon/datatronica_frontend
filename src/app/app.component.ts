import { Component, OnInit } from '@angular/core';
import { InternetService } from './core/service/internet/internet.service';
import { RouterOutlet } from '@angular/router';
import { LoandingComponent } from './dashboard/components/loanding/loanding.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoandingComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
}
