
import { AxiosResponse } from "axios";
import { deleteAsync, getAsync, postAsync, putAsync } from "../http-client";

class BillService {
  post = async (data: any): Promise<AxiosResponse> => {
    return await postAsync('/Cart/CheckoutWithNhanHang', data);
  }
  postVNpay = async (data: any): Promise<AxiosResponse> => {
    return await postAsync('/Cart/CheckoutWithVNpay', data);
  }

}

export default new BillService();
