import { NotificationRepository } from '../repositories/notification_repository.js';
import { currentController } from '../framework/controller.js';
import { USER_INFO } from '../framework/state.js';

let nofiticationRepository;

/***
 * sendNotification
 */

export function sendNotification(title, body, redirect_url, receiver_id)
{
  if (!nofiticationRepository)
  {
    nofiticationRepository = new NotificationRepository();
  }

  const userInfo = currentController.appState.load(USER_INFO);

  if (!userInfo)
  {
    throw new Error('Falha ao enviar notificação e necessario estar autenticado!');
  }

  nofiticationRepository?.create({
    title, body, receiver_id,
    redirect_url,
    sender_id: userInfo.id,
  });
}