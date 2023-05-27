export class PrismaError extends Error {
  private code: string;
  constructor({ code, message }: { code: string; message: string }) {
    super(message);
    this.name = "PrismaError";
    this.code = code;
  }
  static handle(error: any) {
    // Unique constraint failed
    if (error.code === "P2002") {
      return new PrismaError({
        code: error.code,
        message: `${error.meta.target} already in use`,
      });
    }

    // Foreign key constraint failed
    if (error.code === "P2003") {
      return new PrismaError({
        code: error.code,
        message: `${error.meta.target} not found`,
      });
    }

    // Not found
    if (error.code === "P2025") {
      return new PrismaError({
        code: error.code,
        message: `${error.meta.target} not found`,
      });
    }
  }

  get getCode() {
    return this.code;
  }
}
