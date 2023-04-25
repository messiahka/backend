import {TicketsModel} from '../../mongoDB/models/tickets.model.js';

export default class TicketsManager {
    async addTicket(objTicket){
        try {
            const newTicket = await TicketsModel.create(objTicket)
            return newTicket
        } catch (error) {
            throw new Error(error)
        }
    }

    async getOneTicket(mail){
        try {
            const ticket = await TicketsModel.findOne({mail: mail}).lean()
            return ticket
        } catch (error) {
            throw new Error(error) 
        }
    }
}