import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/auth.models';

@Injectable({ providedIn: 'root' })
export class UserProfileService {
    constructor(private http: HttpClient) { }

    getAll(): Observable<User[]> {
        return this.http.get<User[]>(`/api/users`);
    }

    getById(id: number): Observable<User> {
        return this.http.get<User>(`/api/users/${id}`);
    }

    register(user: User): Observable<User> {
        return this.http.post<User>(`/api/users/register`, user);
    }

    update(id: number, user: Partial<User>): Observable<User> {
        return this.http.put<User>(`/api/users/${id}`, user);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`/api/users/${id}`);
    }

    getByEmail(email: string): Observable<User> {
        return this.http.get<User>(`/api/users/email/${email}`);
    }

    changePassword(id: number, passwordData: { currentPassword: string, newPassword: string }): Observable<void> {
        return this.http.post<void>(`/api/users/${id}/change-password`, passwordData);
    }
}

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    // Basic user operations
    getAllUsers(): Observable<User[]> {
        return this.http.get<User[]>('/api/admin/users');
    }

    getUserById(id: number): Observable<User> {
        return this.http.get<User>(`/api/admin/users/${id}`);
    }

    createUser(user: User): Observable<User> {
        return this.http.post<User>('/api/admin/users', user);
    }

    updateUser(id: number, user: Partial<User>): Observable<User> {
        return this.http.put<User>(`/api/admin/users/${id}`, user);
    }

    deleteUser(id: number): Observable<void> {
        return this.http.delete<void>(`/api/admin/users/${id}`);
    }

    // Role management
    assignRole(userId: number, role: string): Observable<User> {
        return this.http.post<User>(`/api/admin/users/${userId}/roles`, { role });
    }

    removeRole(userId: number, role: string): Observable<User> {
        return this.http.delete<User>(`/api/admin/users/${userId}/roles/${role}`);
    }

    // Account status
    activateUser(id: number): Observable<User> {
        return this.http.post<User>(`/api/admin/users/${id}/activate`, {});
    }

    deactivateUser(id: number): Observable<User> {
        return this.http.post<User>(`/api/admin/users/${id}/deactivate`, {});
    }

    // Search and filter
    searchUsers(query: string): Observable<User[]> {
        return this.http.get<User[]>(`/api/admin/users/search?query=${query}`);
    }

    filterUsersByRole(role: string): Observable<User[]> {
        return this.http.get<User[]>(`/api/admin/users/filter?role=${role}`);
    }
}
