import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { USER_STORAGE_KEY } from '@shared/constants/constant';
import { Subject } from 'rxjs';
import { DataService } from '../../../services/data.service';
import {
  AuthApiError,
  createClient,
  Session,
  SupabaseClient,
  User,
} from '@supabase/supabase-js';
import { BehaviorSubject, Observable } from 'rxjs';
import { NotifierService } from '../../../services/notifier.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private supabase: SupabaseClient;
  private userSubject = new BehaviorSubject<User | null>(null);

  constructor(
    private toast: NotifierService,
    private dataService: DataService
  ) {
    this.supabase = createClient(
      environment.supabase.url,
      environment.supabase.publicKey
    );
    this.setUser();
  }

  get user$(): Observable<User | null> {
    return this.userSubject.asObservable();
  }

  async signUp(
    email: string,
    firstName: string,
    lastName: string,
    birthday: string,
    password: string,
    phone: string
  ): Promise<string> {
    try {
      const { data, error } = await this.supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            phone: phone,
            birthday: birthday,
          },
        },
      });
      if (error) {
        this.toast.ShowWarning('Alerta', error.message);
        return `Error: ${error.message}`;
      } else {
        return data.user!.id;
      }
    } catch (error) {
      this.toast.ShowError('Error', error);
      return `Error: ${error}`;
    }
  }

  async logIn(email: string, password: string) {
    try {
      const { data, error } = await this.supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) {
        this.toast.ShowWarning('Alerta', error.message);
        return false;
      } else {
        this.toast.ShowSuccess(
          'Exito',
          'Bienvenido ' + email + ', has iniciado sesion a tu cuenta con exito!'
        );
        this.setUser();
        return true;
      }
    } catch (error) {
      this.toast.ShowError('Error', error);
      return false;
    }
  }

  async signOut(): Promise<void> {
    const { error } = await this.supabase.auth.signOut();
    if (error) {
      this.toast.ShowError('Error', error.message);
      console.error('Error al cerrar sesión:', error.message);
      return;
    }
    console.log('Sesión cerrada exitosamente');
  }

  private setUser(): void {
    const session = localStorage.getItem(USER_STORAGE_KEY) as unknown as User;
    if (session) {
      console.log('Sesión iniciada en setUser:', session.email);
      this.userSubject.next(session);
    } else {
      console.log('No se encontró ninguna sesión activa en setUser');
      this.userSubject.next(null);
    }
  }
  async getCurrentUser(): Promise<Observable<User | null>> {
    const {
      data: { user },
    } = await this.supabase.auth.getUser();
    this.userSubject.next(user);
    return this.userSubject.asObservable();
  }
}
