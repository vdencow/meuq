export class CrudModel {
    url: string;
    username: string;
    password: string;
    email: string;
    id: any
}

export class CrudResponseModel {

    results: CrudModel[];
    count: number;
    next?: any;
    previous?: any;

}