import { AuthenticateUserService } from './AuthenticateUserService';

let authenticateUserService: AuthenticateUserService;
describe('Authenticate User', () => {
  beforeEach(() => {
    authenticateUserService = new AuthenticateUserService();
  });

  it('Should be authenticate a user', async () => {
    expect(await authenticateUserService.execute()).toBe('token');
  });
});
