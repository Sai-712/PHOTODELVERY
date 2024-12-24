export interface StoredUser {
  id: string;
  name: string;
  email: string;
  faceImage: string;
  role: 'user' | 'admin';
  phone?: string;
}

export const storage = {
  getUsers: (): StoredUser[] => {
    return JSON.parse(localStorage.getItem('users') || '[]');
  },
  
  saveUser: (user: Omit<StoredUser, 'id'>) => {
    const users = storage.getUsers();
    const newUser = { ...user, id: Date.now().toString() };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    return newUser;
  },

  getAdmins: (): StoredUser[] => {
    return JSON.parse(localStorage.getItem('admins') || '[]');
  },

  saveAdmin: (admin: Omit<StoredUser, 'id'>) => {
    const admins = storage.getAdmins();
    const newAdmin = { ...admin, id: Date.now().toString() };
    admins.push(newAdmin);
    localStorage.setItem('admins', JSON.stringify(admins));
    return newAdmin;
  }
};