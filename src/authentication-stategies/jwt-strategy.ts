import {AuthenticationStrategy} from '@loopback/authentication';
import {Request, HttpErrors} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import {inject} from '@loopback/core';
import {TokenServiceBindings} from '../keys';
import {JWTService} from '../services/jwt-service';

export class JWTStrategy implements AuthenticationStrategy {
  constructor(
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: JWTService,
  ) {}
  name: string = 'jwt';
  async authenticate(request: Request): Promise<UserProfile | undefined> {
    const token: string = this.extractCredentials(request);
    const userProfile = await this.jwtService.verifyToken(token);
    return Promise.resolve(userProfile);
  }
  extractCredentials(request: Request): string {
    if (!request.headers.authorization) {
      throw new HttpErrors.Unauthorized('Authorization header is missing');
    }

    const authHeaderValue = request.headers.authorization;

    // authorization  : Bearer xxxc..yyy..zzz

    if (!authHeaderValue.startsWith('Bearer')) {
      throw new HttpErrors.Unauthorized(`
      Authorization header is not type of 'Bearer'.
      `);
    }
    const parts = authHeaderValue.split(' ');
    if (parts.length !== 2) {
      throw new HttpErrors.Unauthorized(`
     Authorization header has too many parts it must follow this pattern 'Bearer xx.yy.zz' where xx.yy.zz should be valid token
    `);
    }
    const token = parts[1];
    return token;
  }
}
