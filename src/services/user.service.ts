import axios, { AxiosInstance } from "axios";
import { UserInterface } from '@/types/User.interface';

class UserService {
    public async getSucursales() {
        return await axios
            .get<UserInterface[]>("http://localhost:3000/usuario")
            .then(response => response.data);
    }
}

export const userService = new UserService();