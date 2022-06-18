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

    public async findById(id: string): Promise<User | undefined> {
        return this.items.find((user) => {
            return user.getId() === id;
        });
    }

    public async update(newUser: User): Promise<void> {
        const index = this.items.findIndex((user) => {
            return user.getId() === newUser.getId();
        });
        this.items[index] = newUser;
    }

    public async exist(id: string): Promise<boolean> {
        const index = this.items.findIndex((user) => {
            return user.getId() === id;
        });

        return index >= 0;
    }
}
