export class User {
    constructor (
        public _id: string,
        public firstname: string,
        public lastname: string,
        public fiscalcode: string,
        public email: string,
        public password: string,
        public role: string,
        public iban: string,
        public money: number
    ) {}
}