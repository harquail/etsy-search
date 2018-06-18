import { Network } from "./network";

const searchElement = document.createElement("input");
searchElement.setAttribute("type", "search");
searchElement.setAttribute("id", "search");
searchElement.addEventListener("input", () => {
  const query = searchElement.value.match(/\S+/g);
  const listings2 = Network.getListings(query);

  listings2.then((b) => {
    let listingsHTML = "";
    for (const listing of b.results) {
      if (listing.error_messages) {
        continue; // skip listings that have errors; they won't have the required fields
      }
      listingsHTML += `<div class='listing'>
      <a href=${listing.url} target=_blank><div class='title'>${listing.title}</div>
      <img src='${listing.Images[0].url_170x135}'></img>
      <div class='price'>$${listing.price}</div>
      </a></div>`; // TODO: localize price
    }

    listingsElement.innerHTML = listingsHTML;
  });
}, true);

const listingsElement = document.createElement("div");
listingsElement.setAttribute("id", "listings");
document.body.appendChild(searchElement);
document.body.appendChild(listingsElement);
