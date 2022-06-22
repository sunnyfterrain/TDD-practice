class UserService {
  constructor(userClient) {
    // 별도의 클라이언트
    this.userClient = userClient;
    this.isLogedIn = false;
  }

  login(id, password) {
    if (!this.isLogedIn) {
      //return fetch('http://example.com/login/id+password') //
      // .then((response) => response.json());
      return this.userClient // 별도의 클라이언트 이름
        .login(id, password) // 별도의 클라이언트를 두었기때문에 추가
        .then((data) => (this.isLogedIn = true));
    }
  }
}

module.exports = UserService;
