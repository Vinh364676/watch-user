export type ReviewState = {
    reviewList: Array<Review>;
    reviewDetail:Review
    reviewCount:number
};


export type Review = {
    reviewId: number;
    productId: number;
    rating: string;
    comment:string;
    date:string;
    userId:number
};