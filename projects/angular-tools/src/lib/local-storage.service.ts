import { Injectable } from "@angular/core";

@Injectable()
export class LocalStorageService {

    public set(key: string, value: any): void {

        if (value == null) {
            localStorage.removeItem(key);
            return;
        }

        localStorage.setItem(key, JSON.stringify(value));
    }

    public get(key: string): any {
        let value = localStorage.getItem(key);
        return value != null ? JSON.parse(value) : value;
    }
}