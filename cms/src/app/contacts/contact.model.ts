export class Contact {
  public group?: string[]

  constructor(
    public id: string,
    public isAGroup: boolean,
    public name: string,
    public email: string,
    public phone: string,
    public imageUrl: string,
    group: string[]
    
  ) {this.group = group}
}