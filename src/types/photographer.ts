export interface Review {
    name: string;
    rating: number;
    comment: string;
    date: string;
  }
  
  export interface Photographer {
    id: number;
    name: string;
    location: string;
    price: number;
    rating: number;
    styles: string[];
    tags: string[];
    bio: string;
    profilePic: string;
    portfolio: string[];
    reviews: Review[];
  }
  