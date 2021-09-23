export class Atributo {
    public id!: Number;
    public name: String;
    public description: String;
    public type: Number;

    constructor(name: String, description: String, type: Number) {
        this.name = name;
        this.description = description;
        this.type = type;
    }
}