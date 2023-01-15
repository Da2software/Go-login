import { headers } from "./headers";
import env from "react-dotenv";
export class AuthEndpoints {
    apiUrl = env.API_URL;
    login(email: string, password: string) {
        const body = {
            email: email,
            password: password
        };
        return fetch(this.apiUrl + "/api/login", {
            method: 'POST',
            credentials: 'include',
            headers: headers,
            body: JSON.stringify(body)
        });
    }
}