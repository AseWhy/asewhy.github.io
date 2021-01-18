import { Module } from "../astecoms-module";

export const HookManager = new class HookManager extends Module {
    constructor(){
        super('HookManager');

        this._hooks = new Map();
    }

    registerHook(_from){
        const keys = typeof _from.getHooks === 'function' ? _from.getHooks() : Object.getOwnPropertyNames(_from).map(e => e.substring(0, 4) === 'hook');

        for(let i = 0, leng = keys.length; i < leng; i++) {
            if(typeof _from[keys[i]] == 'function')
                this._hooks.set(_from.getName() + '.' + keys[i], _from[keys[i]].bind(_from));
        }
    }

    registerHooks(..._from){
        for(let i = 0, leng = _from.length;i < leng; i++){
            this.registerHook(_from[i]);
        }
    }

    dispatchHook(name){
        if(this._hooks.has(name)) {
            this._hooks.get(name)();
        }
    }
}