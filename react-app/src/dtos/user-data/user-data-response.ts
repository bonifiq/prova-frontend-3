export interface UserDataItem {
  title: string;
  body: string;
}

export class UserDataResponse {
  userData: UserDataItem[];

  constructor(
    userData: { userId: number; id: number; title: string; body: string }[]
  ) {
    this.userData = userData.map((item) => ({
      title: item.title,
      body: item.body,
    }));
  }
}
