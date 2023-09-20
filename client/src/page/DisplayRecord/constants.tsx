// const tableHead = [
//   {
//     id: 'BookRefNumber ',
//     label: 'Book Reference Nbr ',
//     dataType: 'string'
//   },
//   {
//     id: 'BookTitle',
//     label: 'Title',
//     dataType: 'string'
//   },
//   {
//     id: 'AuthorName',
//     label: 'Author Name',
//     dataType: 'string'
//   },
//   {
//     id: 'PublicationName',
//     label: 'Publication Name',
//     dataType: 'string'
//   },
//   {
//     id: 'PublishedDate',
//     label: 'Published Date',
//     dataType: 'string'
//   },
//   {
//     id: 'BookAge',
//     label: 'Book Age',
//     dataType: 'string'
//   },
//   {
//     id: 'copiesinstock',
//     label: 'Copies In Stock',
//     dataType: 'string'
//   },
//   {
//     id: 'Currency',
//     label: 'Currency',
//     dataType: 'string'
//   },
//   {
//     id: 'BookPrice',
//     label: 'Book Price',
//     dataType: 'string'
//   },
//   {
//     id: 'Bookratings',
//     label: 'Book Ratings',
//     dataType: 'string'
//   },
//   {
//     id: 'Audiobookavailable',
//     label: 'Audiobook Available',
//     dataType: 'boolean'
//   },
//   {
//     id: 'AudiobookLink',
//     label: 'Audio Book Link',
//     dataType: 'string'
//   }
// ];

type PaginationType = {
  rowsPerPage: number;
  page: number;
};

type ActionMenuType = {
  open: false | string;
  anchorEl: null | HTMLElement;
};

export { PaginationType, ActionMenuType };
