import MetaData from "./MetaData";

export default class GuestSessionService {
  Data = new MetaData();

  async Authorization() {
    const response = await fetch(
      `${this.Data.mainSource}authentication/guest_session/new`,
      this.Data.metaData
    );
    const toJSON = await response.json();
    const responseJSON = await toJSON;
    const guestSessionId = await responseJSON.guest_session_id;
    return guestSessionId;
  }
}
