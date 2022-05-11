/***
 * News
 * Esta classe representa as noticias a serem exibidas no site.
 */

export class News {
  constructor(title, description, carousel_img_url, url, created_at) {
    this.id = undefined;
    this.title = title;
    this.description = description;
    this.carousel_img_url = carousel_img_url;
    this.url = url;
    this.created_at = created_at || new Date().getTime();
  }
}
