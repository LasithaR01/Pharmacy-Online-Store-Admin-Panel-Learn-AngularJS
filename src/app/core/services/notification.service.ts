// src/app/core/services/notification.service.ts

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Notification, NotificationType } from "../models/notification.models";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class NotificationService extends BaseService {
  constructor(protected override http: HttpClient) {
    super(http);
  }

  getAll(): Observable<Notification[]> {
    return this.get<Notification[]>("notifications");
  }

  getById(id: number): Observable<Notification> {
    return this.get<Notification>(`notifications/${id}`);
  }

  create(notification: Partial<Notification>): Observable<Notification> {
    return this.post<Notification>("notifications", notification);
  }

  update(id: number, notification: Partial<Notification>): Observable<Notification> {
    return this.put<Notification>(`notifications/${id}`, notification);
  }

  markAsRead(id: number): Observable<any> {
    return this.post<any>(`notifications/${id}/read`, {});
  }

  getByUser(userId: number): Observable<Notification[]> {
    return this.get<Notification[]>(`notifications/user/${userId}`);
  }

  getUnreadByUser(userId: number): Observable<Notification[]> {
    return this.get<Notification[]>(`notifications/user/${userId}/unread`);
  }

  countUnread(userId: number): Observable<number> {
    return this.get<number>(`notifications/user/${userId}/unread-count`);
  }

  // @ts-ignore
  delete(id: number): Observable<any> {
    return super.delete<any>(`notifications/${id}`);
  }
}
