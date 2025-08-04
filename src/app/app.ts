import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  providers: [MessageService]
})
export class App implements OnInit {
  constructor(private messageService: MessageService) {}
  
  ngOnInit() {
    // PrimeNG configuration is now handled through the providePrimeNG in app.config.ts
  }
}
