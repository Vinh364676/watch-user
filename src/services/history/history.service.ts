
import { AxiosResponse } from "axios";
import { deleteAsync, getAsync, postAsync, putAsync } from "../http-client";

class HistoryService {
  get = async (params: any): Promise<AxiosResponse> => {
    return await getAsync('/OrderCustomer/GetAll', {
      ...params,
      isPublish: true
    })
  }
  getDetail = async (params: any): Promise<AxiosResponse> => {
    return await getAsync('/OrderCustomer/GetAllDetail', {
      ...params,
      isPublish: true
    })
  }
  put = async (id: any, data: any): Promise<AxiosResponse> => {
    return await putAsync(`/OrderCustomer/CanceleOrder/${id}`, data); 
  }

}

export default new HistoryService();
