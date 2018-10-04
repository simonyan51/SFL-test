import Component from './Component';
import { errors } from './../constants';

class ViewComponent extends Component {
    
    constructor(mode = open) {
        super();
    }

    render() {
        throw new Error(errors.NOT_IMPLEMENTED_RENDER_METHOD);
    }
}

export default ViewComponent;