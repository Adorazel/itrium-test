export default class WebSocketService {

  connect(location, onOpen, onClose, onMessage, onError) {
    this.websocket = new WebSocket(location)
    this.websocket.onopen = event => onOpen(event)
    this.websocket.onclose = event => onClose(event)
    this.websocket.onmessage = event => onMessage(event)
    this.websocket.onerror = event => onError(event)
  }

  disconnect() {
    this.websocket.close()
  }

  send(message) {
    this.websocket.send(message)
  }

}