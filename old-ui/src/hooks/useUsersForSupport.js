import { useCallback, useEffect, useRef, useState } from "react";
import { getUsersForSupportApi } from "services/users.service";

/**
 * useUsersForSupport
 * - Loads users for support assignment
 * - Provides loading and error states
 * - Caches via service; can force refresh
 * - Ignores late responses on unmount (simple cancellation pattern)
 */
export function useUsersForSupport() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    load();
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const load = useCallback(async (force = false) => {
    setLoading(true);
    setError(null);
    try {
      const res = await getUsersForSupportApi({ force });
      if (mountedRef.current) {
        setUsers(Array.isArray(res) ? res : []);
      }
    } catch (e) {
      if (mountedRef.current) {
        setError(e);
      }
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  }, []);

  const refresh = useCallback(() => load(true), [load]);
  const retry = useCallback(() => load(false), [load]);

  return { users, loading, error, refresh, retry };
}

export default useUsersForSupport;
