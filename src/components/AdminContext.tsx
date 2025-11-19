import { createContext, useContext, useState, ReactNode } from 'react';

interface Admin {
  id: string;
  username: string;
  email: string;
  role: 'super_admin' | 'admin';
}

interface AdminContextType {
  admin: Admin | null;
  isAdminAuthenticated: boolean;
  adminLogin: (username: string, password: string) => Promise<boolean>;
  adminLogout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<Admin | null>(null);

  const adminLogin = async (username: string, password: string): Promise<boolean> => {
    // Mock admin login - in real app, this would call an API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Demo credentials: admin / admin123
    if (username === 'admin' && password === 'admin123') {
      setAdmin({
        id: '1',
        username: username,
        email: 'admin@optikgoal.com',
        role: 'super_admin',
      });
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setAdmin(null);
  };

  return (
    <AdminContext.Provider
      value={{
        admin,
        isAdminAuthenticated: !!admin,
        adminLogin,
        adminLogout,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
