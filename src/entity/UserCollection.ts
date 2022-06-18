import { User } from './User';

export class UserCollection {
    private static instance: UserCollection;

    private items: User[];

    private constructor() {
        this.items = [];
    }

    public static getInstance(): UserCollection {
        if (!UserCollection.instance) {
            UserCollection.instance = new UserCollection();
        }

        return UserCollection.instance;
    }

    public async getAll(): Promise<User[]> {
        return this.items;
    }

    public async add(user: User): Promise<void> {
        this.items.push(user);
    }
}
