import { sign, verify } from 'jsonwebtoken';
import auth from '@config/auth';
import { IPayload, ITokenProvider, IVerifyToken } from '../ITokenProvider';

class JwtTokenProvider implements ITokenProvider {
  public generateToken(publicUserId: string): string {
    const { secret_token, expires_in_token } = auth.jwt;
    const token = sign({ id: publicUserId }, secret_token, {
      subject: publicUserId,
      expiresIn: expires_in_token,
      algorithm: 'HS256',
    });

    return token;
  }

  public generateRefreshToken(publicUserId: string, email: string): string {
    const { secret_refresh_token, expires_in_refresh_token } = auth.jwt;
    const token = sign({ email }, secret_refresh_token, {
      subject: publicUserId,
      expiresIn: expires_in_refresh_token,
      algorithm: 'HS256',
    });

    return token;
  }

  public expiresRefreshTokenDays(): number {
    const { expires_refresh_token_days } = auth.jwt;
    return expires_refresh_token_days as number;
  }

  public verifyIsValidToken({ secret_type, token }: IVerifyToken): IPayload {
    const { secret_refresh_token, secret_token } = auth.jwt;
    let secret: string;

    if (secret_type === 'refresh') {
      secret = secret_refresh_token;
    } else {
      secret = secret_token;
    }

    const decode = verify(token, secret, {
      algorithms: ['HS256'],
    }) as IPayload;

    return decode;
  }
}

export { JwtTokenProvider };
