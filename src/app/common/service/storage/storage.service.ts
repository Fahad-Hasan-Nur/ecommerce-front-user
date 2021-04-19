import { Injectable } from '@angular/core';
import { AUTH } from '../../constants/global-variables.constant';
@Injectable({
    providedIn: 'root',
})
export class StorageService {
    private storage: Storage;

    constructor() {
        this.storage = localStorage;
    }

    public save(key: any, value: any) {
        value = JSON.stringify(value);
        this.storage.setItem(key, value);
    }

    public read(key: any): any {
        const value = this.storage.getItem(key);
        return JSON.parse(value);
    }

    public remove(key: any) {
        return this.storage.removeItem(key);
    }
    public clear() {
      this.storage.removeItem(AUTH.CURRENT_USER);
      this.storage.removeItem(AUTH.TOKEN);
      this.storage.removeItem(AUTH.ROLES);
    }
    
}
