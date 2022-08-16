import { nanoid } from "nanoid"

export const createNanoID = async () =>{
    return await nanoid(10)
}
