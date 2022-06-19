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

    public async exist(id: string): Promise<boolean> {
        const index = await this.findIndex(id);

        return index >= 0;
    }

    public async update(newUser: User): Promise<void> {
        const index = await this.findIndex(newUser.getId());

        if (index >= 0) {
            this.items[index] = newUser;
        }
    }

    public async delete(id: string): Promise<void> {
        const index = await this.findIndex(id);

        if (index >= 0) {
            this.items.splice(index, 1);
        }
    }

    public getState(): string {
        return JSON.stringify(this.items);
    }

    public updateState(state: string): void {
        const newItems: User[] = JSON.parse(state).map((item: any) => {
            return new User(item.username, item.age, item.hobbies, item.id);
        });
        const allItems: User[] = [...this.items, ...newItems];

        // filter duplicates
        this.items = allItems.filter((value: User, index: number, self: User[]) =>
            index === self.findIndex((item: User) => (
                item.getId() === value.getId()
            )
        ));
    }

    private async findIndex(id: string): Promise<number> {
        return this.items.findIndex((user) => {
            return user.getId() === id;
        });
    }
}
