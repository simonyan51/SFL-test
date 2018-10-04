import { GitHubApiHandler } from "../../../api";
import { JSONHelper } from './../../../core/helpers';

const styles = `

    .repository {
        margin: 2%;
    }

`;

class RepositoriesComponent extends HTMLElement {
    
    constructor() {
        super();
        this.createView();
        this.repositories = [];
        this.page = 1;
    }


    createRepositoriesData(repos) {
        this.repositories = repos;
        this.repositoriesContainer.setAttribute('repositories', JSONHelper.stringify(repos));
    }

    connectedCallback() {
        this.getRepos(this.page);
    }

    getRepos(page, name = '', per_page = 5) {
        GitHubApiHandler.getRepos({name, page, per_page}).then(repos => this.createRepositoriesData(repos));
    }

    createView() {
        this.shadow = this.attachShadow({mode: 'open'});
        this.repositoriesContainer = document.createElement('repository-table-component');
        this.shadow.appendChild(this.repositoriesContainer);

        this.shadow.addEventListener('previousClick', this.onPreviousClick.bind(this));
        this.shadow.addEventListener('nextClick', this.onNextClick.bind(this));
    }

    onPreviousClick() {
        if (this.page > 1) {
            this.getRepos(--this.page);
        }
    }

    onNextClick() {
        this.getRepos(++this.page);
    }
}

customElements.define('repositories-component', RepositoriesComponent);

export default RepositoriesComponent;