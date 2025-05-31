export interface User {
  id: number;
  teamId: string;
  image: string;
  description: string;
  nickname: string;
  createdAt: string;
  updatedAt: string;

  mostFavoriteCategory: {
    id: number;
    name: string;
  };
  averageRating: number;
  reviewCount: number;
  followeesCount: number;
  followersCount: number;
  isFollowing: boolean;
  isMe: boolean;
}
