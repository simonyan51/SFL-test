const styles = `

    .repository {
        background-color: #ccc;
        color: #333;
        padding: 1%;
    }

`;

class RepositoryComponent extends HTMLElement {
    
    constructor() {
        super();
        this.createView();
    }

    createView() {
        this.shadow = this.attachShadow({mode: 'open'});
        this.repository = document.createElement('div');
        this.styles = document.createElement('style');

        this.repository.setAttribute('class', 'repository');
        this.repository.innerHTML = this.getAttribute('url');

        this.styles.textContent = styles;

        this.shadow.appendChild(this.styles);
        this.shadow.appendChild(this.repository);
    }

}

customElements.define('repository-component', RepositoryComponent);

export default RepositoryComponent;