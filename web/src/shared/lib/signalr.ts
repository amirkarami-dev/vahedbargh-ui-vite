import { HttpTransportType, HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
import { getAccessToken } from '@/shared/lib/auth'

// SignalR — same contract as old-ui signalr_helper.js.
// Hubs: /frontnotif (listens for "NewMessage") and /meet. Base from VITE_API_SOCKET.
export function createFrontNotifConnection() {
  return new HubConnectionBuilder()
    .withUrl(`${import.meta.env.VITE_API_SOCKET}/frontnotif`, {
      accessTokenFactory: () => getAccessToken(),
      skipNegotiation: true,
      transport: HttpTransportType.WebSockets,
    })
    .configureLogging(LogLevel.Information)
    .withAutomaticReconnect()
    .build()
}
