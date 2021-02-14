import { Module } from "../astecoms-module";
import { API_HOST } from "../static";

export const AdminApi = new class AdminApi extends Module {
    constructor(){
        super('AdminApi');

        this.watchKeys();
    }

    get is_admin_active(){
        return this.get('is_admin_active');
    }

    get access_token(){
        return this.get('admin_access_token');
    }

    getHooks(){
        return [

        ]
    }

    watchKeys(){
        this._keys = new Array();

        window.addEventListener('keypress', e => {
            this._keys.push(e.key);

            this.checkKeys();
        });
    }

    async checkKeys(){
        if('HESOYAM' == this._keys.slice(-7).join('')) {
            const token = await window.astecInput('Токен авторизации');
            
            if(token !== false) {
                this.set('is_admin_active', true);
                this.set('admin_access_token', token);
            }
        }
    }

    async fetchAccess(){
        try {
            const responce = await fetch(API_HOST + 'method/can_access?token=' + this.access_token);

            if(responce.status === 200)
                return responce.json();
            else
                return false;
        } catch (e) {
            return false;
        }
    }
    
    async fetchVisitors(){
        try {
            const responce = await fetch(API_HOST + 'method/visitors?token=' + this.access_token);

            if(responce.status === 200)
                return responce.json();
            else
                return false;
        } catch (e) {
            return false;
        }
    }

    async fetchOrders(){
        try {
            const responce = await fetch(API_HOST + 'method/orders?token=' + this.access_token);

            if(responce.status === 200)
                return responce.json();
            else
                return false;
        } catch (e) {
            return false;
        }
    }

    async removeOrder(id) {
        try {
            const responce = await fetch(API_HOST + 'method/remove_order?token=' + this.access_token + '&id=' + id);

            if(responce.status === 200)
                return responce.json();
            else
                return false;
        } catch (e) {
            return false;
        }
    }
}