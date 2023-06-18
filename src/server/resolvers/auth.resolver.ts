import * as argon from "argon2";
import { IGraphqlContext } from "../common/graphql.context";
import { AuthenticationError, NotFoundError } from "@/server/utils";
import { LoginSchema, validateData } from "@/validations";
import { AuthService, UserService } from "../services";
interface ILogin {
  email: string;
  password: string;
}

export const AuthResolver = {
  Mutation: {
    login: async (
      _: any,
      {
        data,
      }: {
        data: ILogin;
      },
      { res }: IGraphqlContext
    ) => {
      await validateData({ schema: LoginSchema, data });

      const user = await UserService.findUserByEmail(data.email);

      if (!user) throw new NotFoundError("User not found");

      const passwordIsValid = await argon.verify(user.password, data.password);

      if (!passwordIsValid) throw new AuthenticationError("Invalid password");

      const token = await AuthService.login(user, data);

      res?.setHeader("Authorization", `Bearer ${token}`);

      return {
        user,
        accessToken: `Bearer ${token}`,
      };
    },
  },
};
