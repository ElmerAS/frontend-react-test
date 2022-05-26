import http from "../http-common";
class ObjectDataService {
  getAll() {
    return http.get("/listObjects");
  }
  get(key) {
    return http.get(`/getObject?key=${key}`);
  }
  upload(data) {
    return http.post("/putObject", data);
  }
  delete(key) {
    return http.post(`/deleteObject?key=${key}`);
  }
}
export default new ObjectDataService();
