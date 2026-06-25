// User-related service calls isolated from UI components
// Keeps API layer modular and testable
import { get } from "helpers/api_helper";
import { GET_USERS_FOR_SUPPORT_URL } from "helpers/url_helper";

/**
 * Fetch list of users for support ticket direct assignment.
 * Expected response: Array<{ id: number|string, firstName: string, lastName: string }>
 * Errors are propagated to caller for UI layer handling.
 */
// Simple in-memory cache with TTL
let _usersForSupportCache = null;
let _usersForSupportCacheTime = 0;
const USERS_FOR_SUPPORT_TTL_MS = 5 * 60 * 1000; // 5 minutes

export const getUsersForSupportApi = async ({ force = false } = {}) => {
  const now = Date.now();
  if (!force && _usersForSupportCache && now - _usersForSupportCacheTime < USERS_FOR_SUPPORT_TTL_MS) {
    return _usersForSupportCache;
  }
  const res = await get(GET_USERS_FOR_SUPPORT_URL);
  _usersForSupportCache = res;
  _usersForSupportCacheTime = Date.now();
  return res;
};

export const invalidateUsersForSupportCache = () => {
  _usersForSupportCache = null;
  _usersForSupportCacheTime = 0;
};

export default {
  getUsersForSupportApi,
  invalidateUsersForSupportCache,
};
