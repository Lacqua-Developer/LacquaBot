export class UserProfile {
  id: ID;
  status: number;
  isBusiness: boolean;
  canReceiveMessage: boolean;
  numberExists: boolean;
}

export class ID {
  server: string;
  user: string;
  _serialized: string;
}
