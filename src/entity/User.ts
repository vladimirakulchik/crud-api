export class User {
    protected id?: string;
    protected username: string;
    protected age: number;
    protected hobbies: string[];

    public constructor(username: string, age: number, hobbies: string[], id?: string) {
        this.id = id;
        this.username = username;
        this.age = age;
        this.hobbies = hobbies;
    }

    public getId(): string {
        return this.id ?? '';
    }
};
