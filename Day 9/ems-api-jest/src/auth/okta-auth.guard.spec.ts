import { ConfigService } from "@nestjs/config";
import { OktaAuthGuard } from "./okta-auth.guard"

describe('OktaAuthGuard', ()=>{
    let guard: OktaAuthGuard;
    let mockConfigService: jest.Mocked<ConfigService>;

    beforeEach(()=> {
        mockConfigService = {
            get : jest.fn()
        }
    })
})