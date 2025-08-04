import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    CardModule,
    ButtonModule,
    MenubarModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  menuItems: MenuItem[] = [];
  
  public authService = inject(AuthService);
  private router = inject(Router);
  
  ngOnInit() {
    // Verificar si el usuario está autenticado
    if (!this.authService.currentUser()) {
      this.router.navigate(['/login']);
      return;
    }
    
    // Configurar menú
    this.setupMenu();
  }
  
  setupMenu() {
    this.menuItems = [
      {
        label: 'Inicio',
        icon: 'pi pi-home',
        routerLink: '/home'
      },
      {
        label: 'Perfil',
        icon: 'pi pi-user',
        command: () => {
          // Implementar vista de perfil en el futuro
          console.log('Perfil');
        }
      },
      {
        label: 'Cerrar Sesión',
        icon: 'pi pi-sign-out',
        command: () => {
          this.authService.signOut();
        }
      }
    ];
  }
}