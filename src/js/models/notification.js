/***
 * Notification
 * Esta classe representa as notificações que os usuários recebem.
 */

 export class Notification {
  constructor(title, body, redirect_url, sender_id, receiver_id, created_at) {
    this.id = undefined;
    this.title = title;
    this.body = body;
    this.redirect_url = redirect_url;
    this.sender_id = sender_id;
    this.receiver_id = receiver_id;
    this.viewed = false;
    this.created_at = created_at || new Date().getTime();
  }
}