import { AdminUserModule } from './admin-user.module';

describe('AdminUserModule', () => {
  let adminUserModule: AdminUserModule;

  beforeEach(() => {
    adminUserModule = new AdminUserModule();
  });

  it('should create an instance', () => {
    expect(adminUserModule).toBeTruthy();
  });
});
