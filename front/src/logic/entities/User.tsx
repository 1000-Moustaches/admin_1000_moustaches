class User {
    id?: number;
    name?: string;
    firstname?: string;
    email?: string;
    isReferent?: boolean;
    displayName?: string;

    constructor(id?: number, name?: string, firstname?: string, email?: string, is_referent?: boolean) {
        this.id = id;
        this.name = name;
        this.firstname = firstname;
        this.email = email;
        this.isReferent = is_referent;
        this.displayName = name + " " + firstname;
    }
}

export default User;
