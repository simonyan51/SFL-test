const styles = `
    .user-info-container {
        height: 100%;
        background-color: #ccc;
    }

    .user-info-container > div {
        padding: 2%;
        font-weight: bold;
        color: #333;
    }
`;

class UserInfoComponent extends HTMLElement {
    
    constructor() {
        super();
        this.createView();
    }


    createView() {
        this.shadow = this.attachShadow({mode: 'open'});
        this.container = document.createElement('div');

        this.nameElement = document.createElement('div');
        this.typeElement = document.createElement('div');
        this.locationElement = document.createElement('div');
        this.companyElement = document.createElement('div');
        this.emailElement = document.createElement('div');

        this.styles = document.createElement('style');

        this.styles.textContent = styles;

        this.container.setAttribute('class', 'user-info-container');

        this.container.appendChild(this.nameElement);
        this.container.appendChild(this.typeElement);
        this.container.appendChild(this.locationElement);
        this.container.appendChild(this.companyElement);
        this.container.appendChild(this.emailElement);

        this.shadow.appendChild(this.styles);
        this.shadow.appendChild(this.container);
    }


    static get observedAttributes() {
        return ['name', 'type', 'location', 'company', 'email'];
      }

    attributeChangedCallback(name, prevValue, newValue) {
        switch(name) {
            case 'name':
            this.nameElement.innerHTML = `Name: ${newValue}`;
            break;
            case 'type':
            this.typeElement.innerHTML = `Type: ${newValue}`;
            break;
            case 'location':
            this.locationElement.innerHTML = `Location: ${newValue}`;
            break;
            case 'company':
            this.companyElement.innerHTML = `Company: ${newValue}`;
            break;
            case 'email':
            this.emailElement.innerHTML = `Email: ${newValue}`;
            break;
        }
    }
}

customElements.define('user-info-component', UserInfoComponent);

export default UserInfoComponent;