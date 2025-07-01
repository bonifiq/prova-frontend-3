import type { User } from "../interfaces/IUser"
import { BtnComponent } from "./BtnComponent"

export const UserComponent = ({ id, name, email }:User) => {
    return(
        <div key={id} className="cabecalho">
            <BtnComponent />
            <p>Nome: {name}</p>
            <p>E-mail: {email}</p>
        </div>
    )
}