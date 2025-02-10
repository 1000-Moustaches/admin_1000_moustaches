import User from "../entities/User";

class UserDTO {
    id: number;
    name: string;
    firstname: string;
    email: string;
    isReferent: boolean;

    constructor(user: any) {
        this.id = user.id;
        this.name = user.name;
        this.firstname = user.firstname;
        this.email = user.email;
        this.isReferent = user.isReferent;
    }

    toEntity(): User {
        return new User(
            this.id,
            this.name,
            this.firstname,
            this.email,
            this.isReferent
        );
    }
}

export default UserDTO;