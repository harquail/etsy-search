
export class Favorite {

  /**
   * Toggle the favorite status of an id
   * @static
   * @param listingId
   */
  public static toggleFavorite(listingId: number) {
    if (this.isFavorite(listingId)) {
      this.unSetFavorite(listingId);
    } else {
      this.setFavorite(listingId);
    }
  }

  /**
   * @static
   * @param listingId
   * @returns whether an item is marked as a favorite
   */
  public static isFavorite(listingId: number): boolean {
    const storedFavorites = localStorage.getItem(this.storageKey) || "";

    const favorites = storedFavorites.split(",");
    return favorites.indexOf(`${listingId}`) !== -1;

  }

  private static storageKey = "harquailEtsyFavorites";

  private static setFavorite(listingId: number) {
    let storedFavorites = localStorage.getItem(this.storageKey) || "";
    storedFavorites += `${listingId},`;
    localStorage.setItem(this.storageKey, storedFavorites);
  }

  private static unSetFavorite(listingId: number) {
    const storedFavorites = localStorage.getItem(this.storageKey) || "";
    const replacedFavoirtes = storedFavorites.replace(`${listingId},`, "");
    localStorage.setItem(this.storageKey, replacedFavoirtes);

  }
}
