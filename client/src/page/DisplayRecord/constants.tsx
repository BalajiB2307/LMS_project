
type PaginationType = {
  rowsPerPage: number;
  page: number;
};

type ActionMenuType = {
  open: false | string;
  anchorEl: null | HTMLElement;
};

export { PaginationType, ActionMenuType };
