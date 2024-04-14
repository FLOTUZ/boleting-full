export class AuthenticationError extends Error {
  constructor(
    { message }: { message?: string } = {
      message: "AUTHENTICATION_ERROR",
    }
  ) {
    super(message);
  }
}
