import { IListings } from "./listingModel";
import { ListingView } from "./listingView";
import { Network } from "./network";

// TODO: make an app view

/** Search element */

const searchElement = document.createElement("input");
searchElement.setAttribute("type", "search");
searchElement.setAttribute("id", "search");

/**
 * On input changes, get new listings from API and update listings.
 */
searchElement.addEventListener("input", () => {
  const query = searchElement.value.match(/\S+/g);
  Network.getEtsyListings(query)
    .then(updateListings);
}, true);

document.body.appendChild(searchElement);

/** Listings */

const listingsElement = document.createElement("div");
listingsElement.setAttribute("id", "listings");

/**
 * Update listings element's contents with html of listings.
 * @param listings
 */
const updateListings = (listings: IListings) => {
  let listingsHTML = "";
  for (const listing of listings.results) {
    if (listing.error_messages) {
      continue; // skip listings that have errors; they won't have the required fields
    }
    const listingView = new ListingView(listing);
    listingsHTML += listingView.HTML();
  }
  listingsElement.innerHTML = listingsHTML;
};
document.body.appendChild(listingsElement);

/** Pages */
const pagesElement = document.createElement("div");
pagesElement.setAttribute("id", "pages");
document.body.appendChild(pagesElement);
