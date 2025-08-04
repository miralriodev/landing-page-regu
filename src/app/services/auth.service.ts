import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

export interface Profile {
  id: string;
  name: string;
  username: string;
  email: string;
  created_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private supabase: SupabaseClient;
  private router = inject(Router);
  
  // Signals para el estado de autenticación
  currentUser = signal<User | null>(null);
  userProfile = signal<Profile | null>(null);
  loading = signal<boolean>(false);
  
  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
    this.loadUser();
  }
  
  async loadUser() {
    this.loading.set(true);
    
    try {
      // Obtener sesión actual
      const { data: { user } } = await this.supabase.auth.getUser();
      
      if (user) {
        this.currentUser.set(user);
        await this.loadProfile(user.id);
      }
    } catch (error) {
      console.error('Error al cargar usuario:', error);
    } finally {
      this.loading.set(false);
    }
  }
  
  async loadProfile(userId: string) {
    try {
      const { data, error } = await this.supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) throw error;
      
      if (data) {
        this.userProfile.set(data as Profile);
      }
    } catch (error) {
      console.error('Error al cargar perfil:', error);
    }
  }
  
  async signUp(email: string, password: string, name: string, username: string) {
    try {
      this.loading.set(true);
      
      // Registrar usuario
      const { data: { user }, error } = await this.supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            username
          }
        }
      });
      
      if (error) throw error;
      
      if (user) {
        // No es necesario crear manualmente el perfil, ya que el trigger lo hace automáticamente
        // El trigger handle_new_user() se encarga de crear el perfil
        
        this.currentUser.set(user);
        // Esperar un momento para que el trigger tenga tiempo de ejecutarse
        await new Promise(resolve => setTimeout(resolve, 1000));
        await this.loadProfile(user.id);
        this.router.navigate(['/login'], { queryParams: { registered: 'true' } });
      }
      
      return { success: true };
    } catch (error: any) {
      console.error('Error en registro:', error);
      return { success: false, error: error.message };
    } finally {
      this.loading.set(false);
    }
  }
  
  async signIn(email: string, password: string) {
    try {
      this.loading.set(true);
      
      const { data: { user }, error } = await this.supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      
      if (user) {
        this.currentUser.set(user);
        await this.loadProfile(user.id);
        this.router.navigate(['/home']);
      }
      
      return { success: true };
    } catch (error: any) {
      console.error('Error en inicio de sesión:', error);
      return { success: false, error: error.message };
    } finally {
      this.loading.set(false);
    }
  }
  
  async signOut() {
    try {
      this.loading.set(true);
      await this.supabase.auth.signOut();
      this.currentUser.set(null);
      this.userProfile.set(null);
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    } finally {
      this.loading.set(false);
    }
  }
}