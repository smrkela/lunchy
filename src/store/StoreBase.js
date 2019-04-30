import store from "../store";

export default class StoreBase {

    constructor(name) {

        console.log(`Registering store ${name}.`);

        this._name = name;

        this.validateStore();

        store.registerModule(this._name, this);
    }

    validateStore() {

        if (!this.state)
            throw Error(`State for store ${name} must be defined.`);

        if (!this.mutations)
            throw Error(`Mutations for store ${name} must be defined.`);

        if (!this.actions)
            throw Error(`Actions for store ${name} must be defined.`);

        if (!this.getters)
            throw Error(`Getters for store ${name} must be defined.`);
    }

}