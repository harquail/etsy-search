import { Network } from "./network";

const listings = Network.getListings();
listings.then((a) => {

  let listingsHTML = "";
  for (const listing of a.results) {
    console.log(listing);
    if (listing.error_messages) {
      continue;
    }
    listingsHTML += `<div class='listing'>
    <a href=${listing.url} target=_blank><div class='title'>${listing.title}</div>
    <img src='${listing.Images[0].url_170x135}'></img>
    <div class='price'>$${listing.price}</div>
    </a></div>`; // TODO: localize price
    console.log(listingsHTML);
  }
  document.body.innerHTML = listingsHTML;
});
listings.catch((e) => {
  document.body.innerHTML = `error: ${e}`;
});
