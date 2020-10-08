export class Card {
    constructor(
        public _id: string,
        public name: string,
        public cardNumber: string,
        public expMonth: number,
        public expYear: number,
        public cvc: number,
        public money: number,
        public user: string
    ) {}    
}
