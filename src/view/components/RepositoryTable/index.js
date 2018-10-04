import { JSONHelper } from './../../../core/helpers';

const styles = `
    .repositories-container {
    }

    .repository {
        margin: 2% 0;
    }
`;

class RepositoryTableComponent extends HTMLElement {
    
    constructor() {
        super();
        this.createView();
        this.createListeners();
    }

    static get observedAttributes() {
        return ['repositories'];
    }

    createView() {
        this.shadow = this.attachShadow({mode: 'open'});
        this.repositoryContainer = document.createElement('div');
        this.styles = document.createElement('style');
        this.paginator = document.createElement('paginator-component');
        this.repositoryContainer.setAttribute('class', 'repositories-container');
        this.styles.textContent = styles;
        this.createRepositoriesList(this.getAttribute('repositories'));

        this.shadow.appendChild(this.styles);
        this.shadow.appendChild(this.paginator);
        this.shadow.appendChild(this.repositoryContainer);


        this.shadow.addEventListener('previousClick', this.onPreviousClick.bind(this));
        this.shadow.addEventListener('nextClick', this.onNextClick.bind(this));
    }

    createListeners() {
        this.previousClickEvent = new CustomEvent("previousClick", {
            bubbles: true,
            cancelable: false,
        });

        this.nextClickEvent = new CustomEvent("nextClick", {
            bubbles: true,
            cancelable: false,
        });
    }


    onPreviousClick() {
        this.dispatchEvent(this.previousClickEvent);
    }

    onNextClick() {
        this.dispatchEvent(this.nextClickEvent);
    }


    createRepositoriesList(repositories) {
        this.repositories = JSONHelper.parse(repositories);
        const repositoriesElements = repositories && this.repositories.map(repository => 
            `<div class="repository">
                <repository-component url=${repository.url}></repository-component>
            </div>`
            ).join('') || '';
        this.repositoryContainer.innerHTML = repositoriesElements;
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            
            case 'repositories':
            this.createRepositoriesList(newValue);
            break;
        }
    }

}


customElements.define('repository-table-component', RepositoryTableComponent);

export default RepositoryTableComponent;