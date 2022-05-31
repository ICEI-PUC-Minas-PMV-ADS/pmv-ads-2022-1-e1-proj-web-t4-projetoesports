import { NotificationRepository } from '../repositories/notification_repository.js';
import { Notification } from '../models/notification.js';

let nofiticationRepository = null;

/***
 * sendNotification
 */

export function sendNotification(title, body, sender_id, receiver_id)
{
  if (!nofiticationRepository)
  {
    nofiticationRepository = new NotificationRepository();
  }

  nofiticationRepository?.create(new Notification(
    title, body, null, sender_id, receiver_id,
  ));
}

/***
 * sendNotificationWithRedirect
 */

 export function sendNotificationWithRedirect(title, body, redirect_url, sender_id, receiver_id)
 {
   if (!nofiticationRepository)
   {
     nofiticationRepository = new NotificationRepository();
   }
 
   nofiticationRepository?.create(new Notification(
    title, body, redirect_url, sender_id, receiver_id,
  ));
 }