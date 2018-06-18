import { Promise } from "es6-promise";
import { Credentials } from "./credentials";

const listingEndpoint = `https://openapi.etsy.com/v2/listings/active.js`;
const listingsFields = ["title", "description", "price", "url", "listing_id"];
const listingsIncludes = "Images:1:0";
const listingsSort = "score";

(window as any).loadJSONP = {
  counter: 0,
  ownedBy: "Network.ts",
};

export class Network {

  public static getListings(keywords?: string[]): Promise<any> {
    return Network.loadJSONP(`${listingEndpoint}?api_key=${Credentials.etsyKey}\
&fields=${listingsFields.join(",")}\
&sort_on=${listingsSort}\
&includes=${listingsIncludes}\
${keywords ? "&keywords=" + keywords.join(",") : ""}`); // add keywords if they exist
  }

  private static callbackCounter = 0;

  private static loadJSONP(url, parameter = "callback") {
    const prop = "loadJSONP.back" + ++Network.callbackCounter;
    const script = document.createElement("script");
    function withCleanUp(resolve) {
      return (result) => {
        (window as any).loadJSONP[prop] = null;
        document.head.removeChild(script);
        resolve(result);
      };
    }
    return new Promise((resolve, reject) => {
      (window as any).loadJSONP[`back${Network.callbackCounter}`] = withCleanUp(resolve);
      script.onerror = withCleanUp(reject);
      script.src = url + "&" + parameter + "=" + prop;
      document.head.appendChild(script);
    });
  }
}
