const styles = `
    .container {
        text-align: right;
        padding: 1%;
    }

    .pagination-button {
        border: 0;
        padding: 1% 3%;
        margin: 0 1%;
    }

`;

class Paginator extends HTMLElement {
    
    constructor() {
        super();
        this.createView();
        this.createListeners();
    }

    createView() {
        this.shadow = this.attachShadow({mode: 'open'});
        
        const container = document.createElement('div');

        this.styles = document.createElement('style');
       
        container.setAttribute('class', 'container');

        const previousButton = document.createElement('button');
        const nextButton = document.createElement('button');

        this.styles.textContent = styles;
        
        previousButton.setAttribute('class', 'pagination-button');
        previousButton.addEventListener('click', this.onPreviousClick.bind(this));
        previousButton.innerHTML = 'Prev';

        nextButton.setAttribute('class', 'pagination-button');
        nextButton.addEventListener('click', this.onNextClick.bind(this));

        nextButton.innerHTML = 'Next';

        container.appendChild(previousButton);
        container.appendChild(nextButton);

        this.shadow.appendChild(this.styles);
        this.shadow.appendChild(container);
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

}

customElements.define('paginator-component', Paginator);

export default Paginator;