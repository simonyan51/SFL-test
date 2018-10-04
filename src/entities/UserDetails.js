import User from './User';

class UserDetails extends User {
    
    constructor(model) {
        super(model);

        this.name = model.name;
        this.company = model.company;
        this.location = model.location;
        this.email = model.email;
        this.type = model.type;

    }
}

export default UserDetails;