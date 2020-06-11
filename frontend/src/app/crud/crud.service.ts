import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import { BehaviorSubject } from 'rxjs'
import { CrudModel, CrudResponseModel } from './crud.model'

@Injectable({providedIn: 'root'})


export class CrudService {

    usersState = new BehaviorSubject<{data: CrudModel[], loading: boolean}>({data: [], loading: false})

    constructor(
        private http: HttpClient,
    ) {


    }

    find():void {
        this.usersState.next({data: this.usersState.value.data, loading: true})
        this.http.get<CrudResponseModel>('/users/').subscribe(data => {
            this.usersState.next({data: data.results, loading: false});
        })  
    }

    add(user: CrudModel) {
        return this.http.post<CrudModel>('/users/', user)
    }

    update(user: CrudModel) {
        return this.http.patch<CrudModel>(`/users/${user.id}`, user)
    }

    delete(user: CrudModel):void {
        this.usersState.next({data: this.usersState.value.data, loading: true})
        this.http.delete<any>(`/users/${user.id}`).subscribe(data => {
            this.find();
        })
    }

    addOrUpdate(user) {
        !user.password ? delete user.password : null;
        !user.confirmation ? delete user.confirmation : null;
        return user.url ? this.update(user) : this.add(user); 
    }



}