import { Injectable } from "@angular/core";
import * as CryptoJS from "crypto-js";
import * as SecureStorage from "secure-web-storage";
var SECRET_KEY = "Tolivi-Session-local-storage-1234567890#1234567890";

@Injectable({
  providedIn: "root",
})
export class SessionService {
  session;
  constructor() {
    let secureStorage = new SecureStorage(localStorage, {
      hash: function hash(key) {
        key = CryptoJS.SHA256(key, SECRET_KEY);

        return key.toString();
      },
      encrypt: function encrypt(data) {
        data = CryptoJS.AES.encrypt(data, SECRET_KEY);

        data = data.toString();

        return data;
      },
      decrypt: function decrypt(data) {
        data = CryptoJS.AES.decrypt(data, SECRET_KEY);

        data = data.toString(CryptoJS.enc.Utf8);

        return data;
      },
    });

    this.session = (function () {
      var getSession = function (key) {
        return secureStorage.getItem(key);
      };

      var setSession = function (key, data) {
        console.log(data);
        try {
          secureStorage.setItem(key, data);
        } catch (error) {
          console.log(error);
        }
      };

      var clearSession = function (key) {
        return secureStorage.clear();
      };

      var clearItem = function (key) {
        return secureStorage.removeItem(key);
      };

      return {
        getSession: getSession,
        setSession: setSession,
        clearItem: clearItem,
        clearSession: clearSession,
      };
    })();
  }
}
