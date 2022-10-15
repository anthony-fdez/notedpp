export interface IUser {
  email: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  email_verified: any;
  family_name: string | null;
  given_name: string | null;
  name: string | null;
  picture: string | null;
  token: string | null;
}
