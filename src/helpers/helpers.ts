import { useCallback, useEffect, useState } from 'react';
import { DataStorage } from '../services/dataStorage';

export const Roles = {
  Admin: 'admin',
  Manager: 'manager',
  User: 'user',
};

export interface jwtInterface {
  iss: string;
  iat: number;
  exp: number;
  nbf: number;
  jti: string;
  sub: string;
  prv: string;
  roles: string[];
}

export const parseJwt = (token: string): jwtInterface => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join(''),
    );

    return JSON.parse(jsonPayload);
  } catch (e) {
    throw new Error('Failed to parse JWT token');
  }
};

const useRoles = () => {
  const getRoles = (): string[] => {
    const token = DataStorage.get('jwt');

    if (token) {
      const jwt = parseJwt(token);
      return jwt.roles;
    }

    return [];
  };

  const [jwtRoles, setJwtRoles] = useState<string[]>(getRoles);

  const convertRoles = (role: string | string[]): string[] => {
    if (Array.isArray(role)) {
      return role;
    } else {
      return role.split('|');
    }
  };

  const hasAny = useCallback(
    (role: string | string[]): boolean => {
      const arrayRoles = convertRoles(role);

      if (jwtRoles && jwtRoles.length > 0) {
        for (const role of arrayRoles) {
          if (jwtRoles.includes(role)) {
            return true;
          }
        }
      }

      return false;
    },
    [jwtRoles],
  );

  const hasAll = useCallback(
    (role: string | string[]): boolean => {
      const arrayRoles = convertRoles(role);

      const includedRoles: string[] = [];
      if (jwtRoles && jwtRoles.length > 0) {
        for (const role of arrayRoles) {
          if (jwtRoles.includes(role)) {
            includedRoles.push(role);
          }
        }
      }
      return includedRoles.length === arrayRoles.length;
    },
    [jwtRoles],
  );

  const doesNotHaveAll = (role: string | string[]): boolean => {
    const arrayRoles = convertRoles(role);

    const includedRoles: string[] = [];
    if (jwtRoles && jwtRoles.length > 0) {
      for (const role of arrayRoles) {
        if (!jwtRoles.includes(role)) {
          includedRoles.push(role);
        }
      }
    }

    return includedRoles.length === arrayRoles.length;
  };

  const doesNotHaveAny = (role: string | string[]): boolean => {
    const arrayRoles = convertRoles(role);

    if (jwtRoles && jwtRoles.length > 0) {
      for (const role of arrayRoles) {
        if (!jwtRoles.includes(role)) {
          return true;
        }
      }
    }
    return false;
  };

  const can = hasAny;
  const cannot = doesNotHaveAny;

  useEffect(() => {
    const handleStorageChange = () => {
      setJwtRoles(getRoles());
    };

    handleStorageChange();

    window.addEventListener('local-storage', handleStorageChange);

    return () => {
      window.removeEventListener('local-storage', handleStorageChange);
    };
  }, []);

  return { hasAny, hasAll, doesNotHaveAny, doesNotHaveAll, can, cannot };
};

export default useRoles;
