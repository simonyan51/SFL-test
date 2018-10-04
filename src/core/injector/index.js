import { errors } from './../constants';

const provider$ = Symbol('provider');
const instance$ = Symbol('instance');

class Injector {
    
    constructor() {
        this[provider$] = {};
    }

    static getInstance() {

        if (!Injector[instance$]) {
            Injector[instance$] = new Injector();
        }

        return Injector[instance$];
    }


    registerInjection(token, instance) {
        this[provider$][token] = instance;
    }

    inject(injectionsTokenList, constructorFunction) {
        const injections = [];

        injectionsTokenList.forEach(token => {
            const injectionObject = this[provider$][token];
    
            if (injectionObject) {
          
                injections.push(injectionObject);
            
            } else {
          
              throw new Error(`${errors.CAN_NOT_FIND_INJECTION} ${token}`);
            
            }
        });
        return constructorFunction.bind.apply(constructorFunction, [null].concat(injections));
    }

}

export default Injector;