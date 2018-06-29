import { AdminUserRoutingModule } from './admin-user-routing.module';

describe('AdminUserRoutingModule', () => {
  let adminUserRoutingModule: AdminUserRoutingModule;

  beforeEach(() => {
    adminUserRoutingModule = new AdminUserRoutingModule();
  });

  it('should create an instance', () => {
    expect(adminUserRoutingModule).toBeTruthy();
  });
});
