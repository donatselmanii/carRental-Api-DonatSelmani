const { ObjectId } = require("mongodb");

class User {
    constructor(fullName, email, username, password, role = "user") {
        this._id = new ObjectId();
        this.fullName = fullName;
        this.email = email;
        this.username = username;
        this.password = password;
        this.role = role;
    }
}

module.exports = User;
