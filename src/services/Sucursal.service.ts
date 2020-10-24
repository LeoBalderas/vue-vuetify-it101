import axios, { AxiosInstance } from "axios";
import { SucursalInterface } from '@/types/Sucursal.interface';

class SucursalService {
    public async getSucursales() {
        return await axios
            .get<SucursalInterface[]>("http://127.0.0.1:8000/api/sucursales/list")
            .then(response => response.data);
    }
}

export const sucursalService = new SucursalService();