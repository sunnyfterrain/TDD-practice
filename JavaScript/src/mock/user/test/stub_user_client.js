class UserClient {
  login(id, password) {
    return [
      { id: id, password: password, isLogedIn: true },
      { id: id, password: password, isLogedIn: false },
    ];
  }
}

module.exports = UserClient;
