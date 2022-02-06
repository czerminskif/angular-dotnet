import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export abstract class BaseRepo {

    abstract get baseUrl(): string;

    constructor(protected http: HttpClient) {}

    protected get<T>(urlFragments: any[], queryParams?: any): Observable<T> {

        let observable: Observable<T>;
        let url = this.mergeUrlFragments(urlFragments);
        let headers = new HttpHeaders();

        if (queryParams != null) {
            let params = this.toHttpParams(queryParams);
            observable = this.http.get<T>(url, { params: params, headers: headers })
        }
        else {
            observable = this.http.get<T>(url);
        }

        return observable;
    }

    protected post<T>(urlFragments: any[], body?: any): Observable<T> {

        let url = this.mergeUrlFragments(urlFragments);
        return this.http.post<T>(url, body);
    }

    protected put<T>(urlFragments: any[], body?: any, queryParams?: any): Observable<T> {

        let url = this.mergeUrlFragments(urlFragments);

        if (queryParams != null) {
            let params = this.toHttpParams(queryParams);
            return this.http.put<T>(url, body, { params: params });
        }
        else {
            return this.http.put<T>(url, body);
        }
    }

    protected delete<T>(urlFragments: any[], body?: any): Observable<T> {

        let url = this.mergeUrlFragments(urlFragments);

        if (body != null) {
            const options = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                }),
                body: body,
            };

            return this.http.delete<T>(url, options);
        }
        else {
            return this.http.delete<T>(url);
        }
    }

    protected toHttpParams(object: any): HttpParams {

        let params = new HttpParams();

        for (let propName in object) {

            let value = object[propName];
            if (value != null) {

                if (value instanceof Date) {
                    value = value.toISOString();
                }
                else {
                    value = `${value}`;
                }

                params = params.set(propName, value);
            }
        }

        return params;
    }

    protected mergeUrlFragments(fragments: any[]): string {
        return fragments.map(e => `${e}`).join("/");
    }
}
