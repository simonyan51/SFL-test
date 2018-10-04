class User {

    constructor(userModel) {
        this.avatarUrl = userModel.avatar_url || '';
        this.login = userModel.login || '';
        this.id = userModel.id;
        this.reposUrl = userModel.repos_url;
        this.url = userModel.url;
    }

}

export default User;