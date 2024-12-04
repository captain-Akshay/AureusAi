import bcrypt from "bcryptjs";
export function saltAndHashPassword(password: string) {
  const saltRound = 10;
  const salt = bcrypt.genSaltSync(saltRound);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}
