import TicketsManager from "../persistencia/DAOs/ticketsDAOs/ticketsManager.js";

const ticketsManager = new TicketsManager();

export const addTicket = async (objTicket) => {
    try {
        const newTicket = await ticketsManager.addTicket(objTicket)
        return newTicket
    } catch (error) {
        throw new Error(error)
    }
}

export const getOneTicket = async (user) => {
    try {
        const ticket = await ticketsManager.getOneTicket(user)
        return ticket
    } catch (error) {
        throw new Error(error)
    }
}