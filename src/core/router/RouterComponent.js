import { Component } from './../classes';
import Injector from '../injector';
import { Router } from '.';

class RouterComponent extends Component {
    
    constructor() {
        super();
        this.router = Router.getInstance();
        this.clickEventListenerRef = null;
    }

    connectedCallback() {
        this.clickEventListenerRef = this.addEventListener('click', this.onClick.bind(this));
    }

    onClick($event) {
        const state = this.getAttribute('state') || {};
        const title = this.getAttribute('title') || null;
        const path = this.getAttribute('path') || '';
        this.router.navigate(path, state, title);
    }

    disconnectedCallback() {
        this.removeEventListener('click', this.clickEventListenerRef);
    }


}

// const RouterComponentInjection = Injector.getInstance().inject(['Router'], RouterComponent);
// console.log(RouterComponentInjection.prototype.constructor);

customElements.define('router-component', RouterComponent);

export default RouterComponent;