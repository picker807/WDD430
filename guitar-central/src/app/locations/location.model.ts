import { Guitar } from '../../app/guitars/guitar.model';

export class Location {
  constructor(
    public id: string,
    public storeName: string,
    public address: string,
    public city: string,
    public state: string,
    public zipCode: string,
    public inventory: Guitar[],
  ){}
}