export class SimpleUserInfo {
  id: number;
  name: string;
}

export class SpecificUserInfo extends SimpleUserInfo {
  cpf: string;
  email: string;
}
