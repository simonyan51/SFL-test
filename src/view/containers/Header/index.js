const styles = `
    .header-container {
        display: flex;
        background-color: #4cbb17;
        padding: 1%;
    }
    .tab-item {
        font-weight: bold;
        font-size: 1.6rem;
        border-right: 2px solid #fff;
        color: #fff;
        cursor: pointer;
        padding: 0 2%;
        text-align: center;
    }
`;

class HeaderComponent extends HTMLElement {
    
    constructor() {
        super();
        this.users = [];
        this.shadow = this.attachShadow({mode: 'open'});
        this.headerContainer = document.createElement('header');
        this.headerContainer.setAttribute('class', 'header-container');
        this.styles = document.createElement('style');
        this.styles.textContent = styles;

        this.shadow.appendChild(this.headerContainer);
        this.shadow.appendChild(this.styles);

        this.render();
    }

    render() {
        this.headerContainer.innerHTML = `
            <div class="tab-item"><router-component path="users">Users</router-component></div>
            <div class="tab-item"><router-component path="repositories">Repositories</router-component></div>
        `;

        console.log(this.headerContainer);
    }
}

// const usersInjection = Injector.getInstance().inject(['GitHubApiHandler'], UsersComponent);

customElements.define('header-component', HeaderComponent);

export default HeaderComponent;