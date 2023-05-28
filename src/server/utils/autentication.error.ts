export class AuthenticationError extends Error {
  constructor(message: string = "Authentication error") {
    super(message);
  }
}
