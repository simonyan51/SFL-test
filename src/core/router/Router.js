import Injector from "../injector";

const routes$ = Symbol('routes');
const instance$ = Symbol('instance');
const renderContainer$ = Symbol('renderContainer');
const onPopStateHandler$ = Symbol('onPopStateHandler$');

class Router {
    
    // -- Constructor -- //

    constructor(routes = []) {
        this[routes$] = routes;
        window.onpopstate = this[onPopStateHandler$].bind(this);
    }

    // -- Static Members -- //

    /**
     * @name getInstance
     * @description returns only one instance of this class ( Singleton )
     */
    static getInstance() {
        if (!Router[instance$]) {
            Router[instance$] = new Router();
        }
        return Router[instance$];
    }

    // -- Public methods -- //

    setRenderContainer(container) {
        this[renderContainer$] = container;
        this.update();
    }

    setRoutes(routes) {
        this[routes$] = routes;
    }

    navigate(path, state, title) {
        window.history.pushState(state, title, path);
        this.update();
    }

    update() {
        const route = this[routes$].find(route => route.path === window.location.pathname);
        if (route) {
            if (!route.content && route.redirect) {
               this.navigate(route.redirect);
            } else {
                this[renderContainer$].innerHTML = route.content;
            }
            
        }
    }

    // -- private members -- //

    /**
     * @name onPopStateHandler$
     * @description triggers when pop state event is dispatched
     */
    [onPopStateHandler$]($event) {
        $event.preventDefault();
        this.update();
    }

}

Injector.getInstance().registerInjection('Router', Router.getInstance());

export default Router;