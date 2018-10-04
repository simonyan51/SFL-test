import { GitHubApiHandler } from '../../../api';
import { JSONHelper } from './../../../core/helpers';


const styles = `
    .user-details-container {
        display: flex;
        justify-content: space-between;
        padding: 2% 0;
    }

    user-component {
        flex-basis: 25%;
    }
    user-info-component {
        flex-basis: 70%;
    }
    .back-container {
        // display: block;
        color: #333;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 2%;
    }
`;

class UserDetailsComponent extends HTMLElement {
    
    constructor() {
        super();
        this.createView();
        this.repositories = [];
        this.page = 1;
    }

    connectedCallback() {
        this.getUserDetails();
        this.getUserRepos(this.page);
    }
    
    createView() {
        this.shadow = this.attachShadow({mode: 'open'});
        this.userComponent = document.createElement('user-component');
        this.userInfoComponent = document.createElement('user-info-component');

        this.userRepositoriesContainer = document.createElement('repository-table-component');
        
        this.styles = document.createElement('style');

        const userDetailsContainer = document.createElement('div');
        
        const routerComponent = document.createElement('router-component');

        routerComponent.setAttribute('class', 'back-container');
        routerComponent.setAttribute('path', '/users');
        routerComponent.innerHTML = 'Go Back To Users';

        this.styles.textContent = styles;

        userDetailsContainer.setAttribute('class', 'user-details-container');

        const { login, avatarUrl } = window.history.state;
        this.userComponent.setAttribute('login', login);
        this.userComponent.setAttribute('avatarUrl', avatarUrl);
        

        userDetailsContainer.appendChild(this.userComponent);
        userDetailsContainer.appendChild(this.userInfoComponent);

        this.shadow.appendChild(this.styles);
        this.shadow.appendChild(routerComponent);
        this.shadow.appendChild(userDetailsContainer);
        this.shadow.appendChild(this.userRepositoriesContainer);


        
        this.shadow.addEventListener('previousClick', this.onPreviousClick.bind(this));
        this.shadow.addEventListener('nextClick', this.onNextClick.bind(this));
    }

    onPreviousClick() {
        if (this.page > 1) {
            this.getUserRepos(--this.page);
        }
    }

    onNextClick() {
        this.getUserRepos(++this.page);
    }

    setUserInfoComponentData(user) {

        const { name, type, location, company, email } = user;

        this.userInfoComponent.setAttribute('name', name || '-');
        this.userInfoComponent.setAttribute('type', type || '-');
        this.userInfoComponent.setAttribute('location', location || '-');
        this.userInfoComponent.setAttribute('company', company || '-');
        this.userInfoComponent.setAttribute('email', email || '-');
    }

    setUserRepositories(repositories) {
        this.repositories = repositories;
        this.userRepositoriesContainer.setAttribute('repositories', JSONHelper.stringify(this.repositories));
    }

    getUserDetails() {
        const { login } = window.history.state;
        GitHubApiHandler.getUserDetails(login).then(user => this.setUserInfoComponentData(user));
    }

    getUserRepos(page, per_page = 5) {
        const { login } = window.history.state;
        GitHubApiHandler.getUserRepos(login, {page, per_page}).then(repositories => this.setUserRepositories(repositories));
    }
}

customElements.define('user-details-component', UserDetailsComponent);

export default UserDetailsComponent;