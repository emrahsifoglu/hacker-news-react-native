export interface Story {
  id: number;
  type: string;
  title: string;
  url: string;
  score: number;
  kids: [number];
  by: string;
  time: number;
}

export interface User {
  id: string;
  karma: number;
  submitted: [number];
  created: number;
}

export interface UserStory {
  story: Story;
  author: User;
}

export interface NewsState {
  news: UserStory[];
  error: string | undefined;
}
