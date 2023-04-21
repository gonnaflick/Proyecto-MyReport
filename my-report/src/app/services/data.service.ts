import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { from } from 'rxjs';

@Injectable()
export class DataService {
  private supabase: SupabaseClient;

  constructor(private httpClient: HttpClient) {
    this.supabase = createClient(
      environment.supabase.url,
      environment.supabase.publicKey
    );
  }

  getLog(): Observable<any[]> {
    return from(this.supabase.rpc('getlog').then((response) => response.data));
  }

  getUser(): Observable<any[]> {
    return from(this.supabase.rpc('getuser').then((response) => response.data));
  }

  authenticateUser(user_id: string) {
    return this.supabase.rpc('authenticate', { user_id });
  }

  deauthenticateUser(user_id: string) {
    return this.supabase.rpc('deauthenticate', { user_id });
  }

  deauthenticateByDefault(email: string) {
    return this.supabase.rpc('deauthenticateByDefault', { email });
  }
}
