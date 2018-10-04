

const styles = `
    .user-container {
        text-align: center;
        padding: 5%;
        background-color: #ccc;
    }
    .user-image {
        width: 100%;
        border-radius: 25%;
    }
    .username {
        font-size: 1.4rem;
        font-weight: bold;
        color: #333;
    }
`;

class UserComponent extends HTMLElement {
    
    constructor() {
        super();
        this.avatarUrl = null;
        this.login = null;
        this.createView();
    }

    createView() {
        this.shadow = this.attachShadow({mode: 'open'});
        this.userContainer = document.createElement('div');

        this.image = document.createElement('img');
        this.username = document.createElement('p');

        this.styles = document.createElement('style');

        this.userContainer.setAttribute('class', 'user-container');
        this.image.setAttribute('class', 'user-image');
        this.username.setAttribute('class', 'username');

        this.styles.textContent = styles;



        this.shadow.appendChild(this.userContainer);
        this.shadow.appendChild(this.styles);

        this.userContainer.appendChild(this.image);
        this.userContainer.appendChild(this.username);
    }

    connectedCallback() {
        this.avatarUrl = this.getAttribute('avatarUrl');
        this.login = this.getAttribute('login');
        this.render();
    }

    render() {
        this.image.setAttribute('src', this.avatarUrl);
        this.username.innerHTML = this.login;
    }

}

customElements.define('user-component', UserComponent);

export default UserComponent;