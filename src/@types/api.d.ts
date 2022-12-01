export type IAPI = {
  params?: string;
  payload?: any;
};

export type ISubscription = {
  creator_id: number;
  creator_name: string;
  subscriber_id: number;
  status: string;
  handleUpdate: (
    creator_id: number,
    subscriber_id: number,
    status: string
  ) => Promise<void>;
};
