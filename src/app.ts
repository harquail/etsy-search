import { ListingView } from "./listingView";
import { Network } from "./network";

const searchElement = document.createElement("input");
searchElement.setAttribute("type", "search");
searchElement.setAttribute("id", "search");

const updateListings = (b) => {
  let listingsHTML = "";
  for (const listing of b.results) {
    if (listing.error_messages) {
      continue; // skip listings that have errors; they won't have the required fields
    }
    const listingView = new ListingView(listing);
    listingsHTML += listingView.HTML();
  }
  listingsElement.innerHTML = listingsHTML;
};

searchElement.addEventListener("input", () => {
  const query = searchElement.value.match(/\S+/g);
  Network.getListings(query)
    .then(updateListings);
}, true);

const listingsElement = document.createElement("div");
listingsElement.setAttribute("id", "listings");

const pagesElement = document.createElement("div");
pagesElement.setAttribute("id", "pages");

document.body.appendChild(searchElement);
document.body.appendChild(listingsElement);
document.body.appendChild(pagesElement);
