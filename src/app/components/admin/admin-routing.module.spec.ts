import { AdminRoutingModule } from './admin-routing.module';

describe('AdminModule', () => {
  let adminModule: AdminRoutingModule;

  beforeEach(() => {
    adminModule = new AdminRoutingModule();
  });

  it('should create an instance', () => {
    expect(adminModule).toBeTruthy();
  });
});
