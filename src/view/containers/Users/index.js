import { ViewComponent } from "../../../core/classes";
import Injector from "../../../core/injector";
import { GitHubApiHandler } from "../../../api";
import { User } from '../../components/';
import { Router } from './../../../core/router';

const styles = `
    .users-container {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
    }
    .user-item {
        margin: 2%;
        flex-basis: calc(100% / 5 - 4%);
    }

    .search-container {
        padding: 1% 0;
    }
`;

class UsersComponent extends HTMLElement {
    
    constructor() {
        super();
        this.users = [];
        this.page = 1;
        this.searchedUsername = '';
        this.createView();
    }

    createView() {
        this.shadow = this.attachShadow({mode: 'open'});
        this.usersContainer = document.createElement('div');
        this.styles = document.createElement('style');
        this.paginator = document.createElement('paginator-component');

        this.searchContainer = document.createElement('div');
        this.searchInput = document.createElement('input');

        this.searchInput.addEventListener('keypress', this.onSearchInputKeypress.bind(this));

        this.searchInput.setAttribute('class', 'search-input');
        this.searchInput.setAttribute('placeholder', 'Enter User Name');
        this.searchContainer.setAttribute('class', 'search-container');
        
        this.usersContainer.setAttribute('class', 'users-container');
        this.styles.textContent = styles;

        this.shadow.appendChild(this.searchContainer);
        this.shadow.appendChild(this.paginator);
        this.shadow.appendChild(this.usersContainer);
        this.shadow.appendChild(this.styles);
        this.searchContainer.appendChild(this.searchInput);
        this.shadow.addEventListener('previousClick', this.onPreviousClick.bind(this));
        this.shadow.addEventListener('nextClick', this.onNextClick.bind(this));
    }

    onPreviousClick() {
        if (this.page > 1) {
            this.getUsers(this.searchedUsername, --this.page);
        }
    }

    onNextClick() {
        this.getUsers(this.searchedUsername, ++this.page);
    }

    connectedCallback() {
        this.render();
    }   

    onSearchInputKeypress(e) {
        var key = e.which || e.keyCode;
        if (key === 13) {
            const username = e.target.value;
            this.searchedUsername = username;
            this.getUsers(username, this.page);
        }
    }

    getUsers(username, page, per_page = 10) {
        GitHubApiHandler.getUsers({q: username + '+in:login', page, per_page}).then(users => {
            this.users = users;
            this.render();
            // this.update();
        });
    }

    onUserClick(user) {
        return () => {
            Router.getInstance().navigate('/details', user);
        }
    }

    render() {
        this.usersContainer.innerHTML = !this.users.length ? 'NO_USERS' : '';
         this.users.forEach(user => {
            const userItem = document.createElement('div');
            const userElement = document.createElement('user-component');
            userElement.setAttribute('avatarUrl', user.avatarUrl);
            userElement.setAttribute('login', user.login);
            userElement.addEventListener('click', this.onUserClick(user));
            userItem.setAttribute('class', 'user-item');
            userItem.appendChild(userElement);
            this.usersContainer.appendChild(userItem);
        });
    }

}

// const usersInjection = Injector.getInstance().inject(['GitHubApiHandler'], UsersComponent);

customElements.define('users-component', UsersComponent);

export default UsersComponent;