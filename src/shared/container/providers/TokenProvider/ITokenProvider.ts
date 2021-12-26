interface IPayload {
  sub: string;
  email: string;
}

interface IVerifyToken {
  token: string;
  secret_type: 'default' | 'refresh';
}
interface ITokenProvider {
  generateToken(publicUserId: string): string;
  generateRefreshToken(publicUserId: string, email: string): string;
  expiresRefreshTokenDays(): number;
  verifyIsValidToken(data: IVerifyToken): IPayload;
}

export { ITokenProvider, IVerifyToken, IPayload };
