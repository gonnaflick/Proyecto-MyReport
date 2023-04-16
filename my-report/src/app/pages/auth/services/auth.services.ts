import { Injectable } from "@angular/core";
import { environment } from "@env/environment";
import { USER_STORAGE_KEY } from "@shared/constants/constant";
import { AuthApiError, createClient, Session, SupabaseClient, User } from "@supabase/supabase-js";
import { BehaviorSubject, Observable } from "rxjs";
import { NotifierService } from '../../../services/notifier.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private supabase: SupabaseClient;

    constructor(private toast: NotifierService) {
        this.supabase = createClient(environment.supabase.url, environment.supabase.publicKey);
    }

    async signUp(email: string, firstName: string, lastName: string, birthday: string, password: string, phone: string): Promise<string> {
        try {
            const { data, error } = await this.supabase.auth.signUp({
                email: email,
                password: password,
                options: {
                    data: {
                        first_name: firstName,
                        last_name: lastName,
                        phone: phone,
                        birthday: birthday
                    }
                }
            });
            if (error) {
                this.toast.ShowWarning("Alerta", error.message);
                return `Error: ${error.message}`;
            } else {
                this.toast.ShowSuccess("Exito", "Hola " + data.user + ", has creado tu cuenta con exito!");
                return data.user!.id;
            }
        } catch (error) {
            this.toast.ShowError("Error", error);
            return `Error: ${error}`;
        }
    }
}
