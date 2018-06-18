export interface IListings {
  count: number;
  pagination: {
    effective_limit: number;
    effective_offset: number;
    next_offset: number;
    effective_page: number;
    next_page: number;
  };
  results?: IListing[];
}

export interface IListing {
  error_messages?: any;
  Images: [{
    url_170x135: string;
    hex_code: string;
  }];
  description: string;
  url: string;
  listing_id: number;
  price: string;
  title: string;
}
