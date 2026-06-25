import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr"
import getAccessToken from "helpers/jwt-token-access/get_access_token"
import { getUserInfo, getUserInfoSuccess } from "store/actions"
import sagaStore from "../store"


export async function initializeSocket() {
  const connection = new HubConnectionBuilder()
    .withUrl(process.env.REACT_APP_API_SOCKET + "/frontnotif", {
      accessTokenFactory: () => getAccessToken(),
      skipNegotiation: true,
      transport: 1,
    })
    .configureLogging(LogLevel.Information)
    .withAutomaticReconnect()
    .build()
  connection.on("NewMessage", async res => {
    debugger
    sagaStore.dispatch(getUserInfo())
  })
  // Start the connection
  try {
    await connection.start()
    console.log("SignalR connection established successfully.")
  } catch (err) {
    console.error("Error while establishing SignalR connection:", err)
  }
  return connection
}

export const connection = new HubConnectionBuilder()
  .withUrl(process.env.REACT_APP_API_SOCKET + "/frontnotif", {
    accessTokenFactory: () => getAccessToken(),
    skipNegotiation: true,
    transport: 1,
  })
  .configureLogging(LogLevel.Information)
  .withAutomaticReconnect()
  .build()

export const connectionMeet = () => {
  return new HubConnectionBuilder()
    .withUrl(process.env.REACT_APP_API_SOCKET + "/meet", {
      accessTokenFactory: () => getAccessToken(),
      skipNegotiation: true,
      transport: 1,
    })
    .configureLogging(LogLevel.Information)
    .withAutomaticReconnect()
    .build()
}
