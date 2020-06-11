import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import {Observable, throwError} from 'rxjs'
import {map, catchError} from 'rxjs/operators'
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

const server = '/api'
@Injectable({providedIn: 'root'})
export class AuthInterceptor implements HttpInterceptor {

    constructor(private _auth: AuthService, private router: Router) {

    }
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        let clone = req.clone(
            {
                url: req.url.startsWith('http') ? req.url : `${server}${req.url}`,
                headers: req.headers.append(
                    'Authorization', `JWT ${this._auth.loginState.value.token}`
                )
                    
            }
        );
        return next.handle(clone).pipe(

            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    console.log('event--->>>', event);
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {

                if(error.status === 401 && this.router.url !== '/') {
                    this.router.navigateByUrl('/')
                }
                return throwError(error);
            }
            )
        );
        

    }

    





}