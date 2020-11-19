import axios, { AxiosInstance } from "axios";
import { UserInterface } from '@/types/User.interface';

class UserService {
    public async getUsers() {
        return await axios
            .get<UserInterface[]>("http://localhost:3000/usuario")
            .then(response => response.data);
    }

    public async updateUser(user: UserInterface) {
        return await axios
            .patch<UserInterface[]>(`http://localhost:3000/usuario/${user.id}`, user)
            .then(response => response.data);
    }

    public async deleteUser(user: UserInterface) {
        return await axios
            .delete(`http://localhost:3000/usuario/${user.id}`)
            .then(response => response.data);
    }

    public async saveUser(user: UserInterface) {
        return await axios
            .post<UserInterface[]>(`http://localhost:3000/usuario`, user)
            .then(response => response.data);
    }
}

export const userService = new UserService();