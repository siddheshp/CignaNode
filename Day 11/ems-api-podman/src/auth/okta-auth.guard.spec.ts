import { ConfigService } from "@nestjs/config";
import { OktaAuthGuard } from "./okta-auth.guard"
import { ExecutionContext } from "@nestjs/common";

jest.mock("@okta/jwt-verifier", () => {
    return jest.fn().mockImplementation(() => ({
        verifyAccessToken: jest.fn().mockResolvedValue({
            claims: {
                sub: "1234567890",
                email: "john.doe@example.com",
                groups: ["group1", "group2"],
            },
        }),
    }));
});

describe('OktaAuthGuard', () => {
    let guard: OktaAuthGuard;
    let mockConfigService: jest.Mocked<ConfigService>;

    const createMockExecutionContext = (headers: Record<string, string>): ExecutionContext => {
        return {
            switchToHttp: jest.fn().mockReturnValue({
                getRequest: jest.fn().mockReturnValue({
                    headers,
                }),
                getReponse: jest.fn(),
                getNext: jest.fn()
            }),
            getClass: jest.fn(),
            getHandler: jest.fn(),
            getArgs: jest.fn(),
            getArgByIndex: jest.fn(),
            switchToRpc: jest.fn(),
            switchToWs: jest.fn(),
            getType: jest.fn(),
        } as unknown as ExecutionContext;
    }

    beforeEach(() => {
        mockConfigService = {
            get: jest.fn((key: string, defaultValue?: any) => {
                const config: Record<string, string> = {
                    'OKTA_ISSUER': 'https://dev-12345.okta.com/oauth2/default',
                    'OKTA_CLIENT_ID': 'test-client-id',
                    'OKTA_AUDIENCE': 'api://default'
                };
                return config[key] || defaultValue;
            }),
        } as any;

        guard = new OktaAuthGuard(mockConfigService);
    });

    it('should return true for valid token', async () => {
        //Arrange
        const mockContext = createMockExecutionContext({
            authorization: 'Bearer header.payload.sign'
        });

        //Act
        const result = await guard.canActivate(mockContext);

        //Assert
        expect(result).toBeTruthy();
        //expect(result).toBe(true);
    })
})