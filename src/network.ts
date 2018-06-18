import { Promise } from "es6-promise";
import { Credentials } from "./credentials";
import { IListings } from "./listingModel";

const listingEndpoint = `https://openapi.etsy.com/v2/listings/active.js`;
const listingsFields = ["title", "description", "price", "url", "listing_id"];
const listingsIncludes = "Images:1:0";
const listingsSort = "score";

// TODO: make JSONP less gross
(window as any).loadJSONP = {
  ownedBy: "Network.ts",
};

export class Network {

  /**
   * Queries the etsy api for listings.
   *
   * @static
   * @param [keywords] optionally, keywords to search on
   * @returns a promise that will resolve with listings
   */
  public static getEtsyListings(keywords?: string[]): Promise<IListings> {
    return Network.loadJSONP(`${listingEndpoint}?api_key=${Credentials.etsyKey}\
&fields=${listingsFields.join(",")}\
&sort_on=${listingsSort}\
&includes=${listingsIncludes}\
${keywords ? "&keywords=" + keywords.join(",") : ""}`) as Promise<IListings>; // add keywords if they exist
  }

  private static callbackCounter = 0; // # of callbacks created

  /**
   * This nightmare works by setting a globall variable on the window 'loadJSONP'.
   * The result of the callback is sent to callback functions stored on that object
   *
   * @private
   * @static
   * @param url
   * @param [parameter="callback"]
   * @returns
   */
  private static loadJSONP(url, parameter = "callback") {
    const prop = "loadJSONP.back" + ++Network.callbackCounter;
    const script = document.createElement("script");
    const withCleanUp = (resolve) => {
      return (result) => {
        (window as any).loadJSONP[prop] = null;
        document.head.removeChild(script);
        resolve(result);
      };
    };
    return new Promise((resolve, reject) => {
      (window as any).loadJSONP[`back${Network.callbackCounter}`] = withCleanUp(resolve);
      script.onerror = withCleanUp(reject);
      script.src = url + "&" + parameter + "=" + prop;
      document.head.appendChild(script);
    });
  }
}
