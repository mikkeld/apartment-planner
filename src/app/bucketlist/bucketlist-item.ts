export class BucketlistItem {

  public name: string;
  public $key: string;
  public currency: string;
  public image: string;
  public link: string;
  public room: string;
  public tags: Array<string> = [];
  public bucketed: boolean;
  private _price: string;

  static create () {
    return new BucketlistItem();
  }

  static createWithData (item) {
    return new BucketlistItem(
      item._id, item.name, item._price, item.currency,
      item.image, item.link, item.room, item.bucketed, item.tags
    );
  }

  private constructor(
    $key?: string,
    name?: string,
    price: string = '0',
    currency: string = 'dkk',
    image?: string,
    link?: string,
    room?: string,
    bucketed: boolean = false,
    tags: Array<string> = []
  ) {
    this.$key = $key;
    this.name = name;
    this.price = price;
    this.currency = currency;
    this.image = image;
    this.link = link;
    this.room = room;
    this.bucketed = bucketed;
    this.tags = tags;
  }


  set price(price: string) {
    this._price = price || '';
  }

  get price(): string { return this._price; }}
