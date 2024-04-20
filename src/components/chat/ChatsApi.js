const MESSAGES_API = "http://localhost:8080/api/messages";
const USERS_API = "http://localhost:8080/api/users"
export const FIND_MOST_RECENT_MESSAGE = MESSAGES_API + "/findMostRecentPrivateMessageForUser";
export const FIND_ALL_MESSAGES_FOR_USERS = MESSAGES_API + "/findAllMessagesForUsers";
export const GET_ALL_USER_PROFILES = USERS_API + "/getAllUserProfiles";
export const DUMMY_AUTH = USERS_API + "/dummyAuth";