export type Ticket = {
  id: string;
  title: string;
  tag: string[];
  userId: string;
  status: string;
  priority: number;
};

export type User = {
  id: string;
  name: string;
  available: boolean;
};
