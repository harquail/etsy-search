import { IListing } from "./listingModel";

export class ListingView {
  private listing: IListing;
  constructor(listing: IListing) {
    this.listing = listing;
  }

  /**
   * @returns an HTML string for the listing
   */
  public HTML(): string {
    return `<div class='listing' data-etsy-id=${this.listing.listing_id}>
    <a href=${this.listing.url} target=_blank><div class='title'>${this.listing.title}</div>
    <img src='${this.listing.Images[0].url_170x135}'
         style='background-color:#${this.listing.Images[0].hex_code};'
         title='${this.listing.description}'"></img>
    <div class='price'>$${this.listing.price}</div>
    </a><div class='favorite'>💛</div></div>`;  // TODO: localize price
  }
}
