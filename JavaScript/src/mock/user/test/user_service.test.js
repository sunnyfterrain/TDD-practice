const UserService = require('../user_service');
const UserClient = require('../user_client');
const StubUserClient = require('./stub_user_client.js');
jest.mock('../user_client.js');
// 특정한 상황에서 행동을 하는지 안하는지는 mock을 이용해야 함

describe('UserService', () => {
  const login = jest.fn(async () => 'success');
  UserClient.mockImplementation(() => {
    return { login };
  });

  let userService;

  beforeEach(() => {
    userService = new UserService(new UserClient());
  });

  it('로그인을 했을때', async () => {
    await userService.login('abc', 'abc');
    expect(login.mock.calls.length).toBe(1);
  });

  it('한번더 로그인을 했을때', async () => {
    await userService.login('abc', 'abc');
    await userService.login('abc', 'abc');
    expect(login.mock.calls.length).toBe(1);
  });
});
