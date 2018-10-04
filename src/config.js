import Injector from "./core/injector";
import { Router, Route } from "./core/router";
import { GitHubApiHandler } from './api';
import { UsersComponent, RepositoriesComponent, HeaderComponent, UserDetailsComponent } from './view/containers';

const initConfiguration = () => {

    const rootElement$ = document.getElementById('root');

    const router = Router.getInstance();

    router.setRoutes([
        new Route('/', null, '/users'),
        new Route('/users', '<users-component></users-component>'),
        new Route('/repositories', '<repositories-component></repositories-component>'),
        new Route('/details', '<user-details-component></user-details-component>')
    ]);

    router.setRenderContainer(rootElement$);
};

export default initConfiguration;