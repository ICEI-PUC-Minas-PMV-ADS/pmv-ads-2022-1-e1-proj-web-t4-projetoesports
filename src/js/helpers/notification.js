import { NotificationRepository } from '../repositories/notification_repository.js';

let nofiticationRepository;

/***
 * sendNotification
 */

export function sendNotification(title, body, sender_id, receiver_id)
{
  if (!nofiticationRepository)
  {
    nofiticationRepository = new NotificationRepository();
  }

  nofiticationRepository?.create({
    title, body, sender_id, receiver_id,
  });
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
 
   nofiticationRepository?.create({
     title, body, receiver_id,
     redirect_url,
     sender_id,
   });
 }