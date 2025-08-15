import type { Error } from "./types/props";
import type { UserType } from "./types/user";

export const INITIAL_USER_DATA: UserType = {
    id: 0,
    name: '',
    username: '',
    email: '',
    address: {
        street: '',
        suite: '',
        city: '',
        zipcode: '',
        geo: {
            lat: '',
            lng: '',
        }
    },
    phone: '',
    website: '',
    company: {
        name: '',
        catchPhrase: '',
        bs: '',
    }
}

export const INITIAL_ERROR: Error = {
    user: '',
    content: ''
}