import { ApiHandler } from "../core/classes";
import { headers } from "../core/constants";
import Injector from "../core/injector";
import { User, UserDetails, Repository } from '../entities';

class GitHubApiHandler extends ApiHandler {
    
    constructor() {
        super();
        this.domain = 'https://api.github.com/';
        this.setHeader(headers.accept, 'application/vnd.github.v3+json');
    }

    getUsers(queryParams) {
        const url = `${this.domain}users`;
        return this.get(url, queryParams)
        .then(users => users.map(item => new User(item)));
    }

    getUserDetails(username, queryParams = {}) {
        const url = `${this.domain}users/${username}`;
        return this.get(url, queryParams)
        .then(user => new UserDetails(user));
    }  


    getUserRepos(username, queryParams = {}) {
        const url = `${this.domain}users/${username}/repos`;
        return this.get(url, queryParams)
        .then(repos => repos.map(repo => new Repository(repo)));
    }

    getRepos(queryParams = {}) {
        const url = `${this.domain}repositories`;
        return this.get(url, queryParams)
        .then(repos => repos.map(repo => new Repository(repo)));
    }

}


const instance = new GitHubApiHandler();

Injector.getInstance().registerInjection('GitHubApiHandler', instance);

export default instance;