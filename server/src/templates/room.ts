import Player from './player'

export default class Room{
    public id: string
    public name: string
    public creator: string
    public players: Player[]

    public constructor(id: string, name: string, creator: string){
        this.id = id
        this.name = name
        this.creator = creator
        this.players = []
    }
}