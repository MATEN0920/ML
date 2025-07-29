export const getOrCreateSessionId = () => {
  let sessionId = localStorage.getItem("sessionId");
  if (!sessionId) {
    const now = new Date();
    const yyyymmdd = `${now.getFullYear()}${(now.getMonth() + 1)
      .toString()
      .padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}`;
    const random = Math.random().toString(36).substring(2, 8);
    sessionId = `session_${yyyymmdd}_${random}`;
    localStorage.setItem("sessionId", sessionId);
  }
  return sessionId;
};