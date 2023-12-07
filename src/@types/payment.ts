export type PaymentState = {
    paymentList: Array<Payment>;
   
};

export type Payment = {
    orderDescription:string;
    transactionId:string;
    orderId:string;
    paymentMethod:string;
    paymentId:string;
    success:boolean;
    token:string;
    vnPayResponseCode:string

};