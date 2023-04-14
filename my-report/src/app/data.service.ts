import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Access } from "./access/access.model";
import { User } from "./user/user.model";
import { Observable } from "rxjs";

@Injectable()
export class DataService {
    firebase_url = "https://console.firebase.google.com/project/myreport-fb7b9/database/myreport-fb7b9-default-rtdb/data/~2F";

    constructor(private httpClient: HttpClient) { }

    loadAccess(): Observable<Access> {
        return this.httpClient.get<Access>(this.firebase_url);
    }

    saveAccess(Access: Access) {
        this.httpClient.post(this.firebase_url, Access);
    }

    loadUser(): Observable<User> {
        return this.httpClient.get<User>(this.firebase_url);
    }

    saveUser(User: User) {
        this.httpClient.post(this.firebase_url, User);
    }
}