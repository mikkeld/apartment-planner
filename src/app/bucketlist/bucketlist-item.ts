export class BucketlistItem {

  public name: string;
  public id: string;
  public currency: string;
  public image: string;
  public link: string;
  public room: string;
  public tags: Array<string> = [];
  private _price: string;

  private constructor(
    id?: string,
    name?: string,
    price: string = '0',
    currency: string = 'dkk',
    image?: string,
    link?: string,
    room?: string,
    tags: Array<string> = []
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.currency = currency;
    this.image = image;
    this.link = link;
    this.room = room;
    this.tags = tags;
  }

  static create () {
    return new BucketlistItem();
  }

  static createWithData (item) {
    var bucketlistItem = new BucketlistItem(
      item._id, item.name, item._price, item.currency, 
      item.image, item.link, item.room, item.tags
    );
    return bucketlistItem;
   }

  set price(price: string) {
    //this._price = price ? price.replace('.','').replace(',','.') : "";
    this._price = price || "";
  }

  get price(): string { return this._price; }}
