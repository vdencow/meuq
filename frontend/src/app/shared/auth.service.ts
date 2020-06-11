import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import { Router } from '@angular/router'
import { BehaviorSubject } from 'rxjs'

@Injectable(
    {providedIn: 'root'}
)


export class AuthService {

    loginState = new BehaviorSubject<{token?: String, logged: boolean, hasError: boolean}>({token: localStorage.getItem('token'),logged: !!localStorage.getItem('token'), hasError: false})

    constructor(
        private http: HttpClient,
        private router: Router
    ) {
    }

    login(user: {username: string, password: string}): void {
        this.http.post<{token: string}>('/login', user).subscribe(data => {
            localStorage.setItem('token', data.token)
            this.loginState.next({token: data.token, hasError: false, logged: true})
            this.router.navigateByUrl('/crud')
        }, err => {
            this.router.navigateByUrl('/crud')

            this.loginState.next({token: null, hasError: true, logged: false})
        })
    }

    logout() {
        localStorage.removeItem('token');
        this.loginState.next({logged: false, hasError: false});
        this.router.navigateByUrl('/')
    }


}