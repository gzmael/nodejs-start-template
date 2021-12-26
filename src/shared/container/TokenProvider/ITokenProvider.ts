interface IPayload {
  sub: string;
  email: string;
}

interface IVerifyToken {
  token: string;
  secret_type: 'default' | 'refresh';
}
interface ITokenProvider {
  generateToken(id: string): string;
  generateRefreshToken(id: string, email: string): string;
  expiresRefreshTokenDays(): number;
  verifyIsValidToken(data: IVerifyToken): IPayload;
}

export { ITokenProvider, IVerifyToken, IPayload };
