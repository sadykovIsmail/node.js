class UsersStorage {
    constructor() {
        this.storage = {}
        this.id = 0 
    }

    addUser({firstName, lastName, age, email, bio}){
        const id = this.id
        this.storage[id] = {id, firstName, lastName, age, email, bio}
        this.id++
    }

    getUsers(){
        return Object.values(this.storage)
    }

    getUser(id){
        return this.storage[id]
    }

    updateUser(id, {firstname, lastName, age, email, bio}) {
        this.storage[id] = {id, firstname, lastName, age, email, bio}
    }

    deleteUser(id){
        delete this.storage[id]
    }
}

module.exports = new UsersStorage()