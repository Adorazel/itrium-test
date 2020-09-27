export default class FetchService {

  static fetchUrl = (url, method = "GET", headers = {}, body = null) => {
    return fetch(url, {method, headers, body})
  }

  get(url, headers) {
    return FetchService.fetchUrl(url, "GET", headers)
  }

  post(url, headers, body) {
    return FetchService.fetchUrl(url, "POST", headers, body)
  }

  put(url, headers, body) {
    return FetchService.fetchUrl(url, "PUT", headers, body)
  }

  delete(url, headers, body) {
    return FetchService.fetchUrl(url, "DELETE", headers, body)
  }

}