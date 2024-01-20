export class Contact {
  public group?: Contact[]

  constructor(
    public id: string,
    public name: string,
    public email: string,
    public phone: string,
    public imageUrl: string,
    group: Contact[]
  ) {this.group = group}
}
