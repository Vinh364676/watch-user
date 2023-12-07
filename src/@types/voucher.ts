export type VoucherState = {
    voucherList: Array<Voucher>;
};


export type Voucher = {
    id: number;
    code: string;
    value:number;
    startDate:Date;
    endDate:Date;
};