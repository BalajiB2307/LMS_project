import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import {
  Alert,
  INLINE_VARIANT,
  Button,
  IconButton,
  Pagination,
  Search,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  TableFooter,
  TableSortLabel,
  Typography,
  PageHeader
} from '@ellucian/react-design-system/core';
import { colorCtaBlueBase } from '@ellucian/react-design-system/core/styles/tokens';
import { Icon } from '@ellucian/ds-icons/lib';
import ActionMenu from '../../components/ActionMenu';
import Confirmation from '../../components/ConfirmationDialog';
import { ActionMenuType, PaginationType } from './constants';
import { getAllLMS, deleteLms } from '../../utils/HandleApi';
import { format } from 'date-fns';
import {
  spacing50,
  spacing60
} from '@ellucian/react-design-system/core/styles/tokens';
const styles = () => ({
  inline: {
    marginTop: spacing60
  },
  inlineAlert: {
    marginBottom: spacing50
  }
});

function ManageProperties({ classes }) {
  const [lms, setLms] = useState([]);
  const history = useHistory();

  useEffect(() => {
    getLMSData();
  }, []);

  const getLMSData = async () => {
    const response = await getAllLMS();
    setLms(response);
  };

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let alertText = 'Book deleted successfully';
  const customId = 'AlertTimeoutExample';

  const [search, setSearch] = useState('');
  const [searchEnterPress, setSearchEnterPress] = useState('');
  const [orderBy, setOrderBy] = useState('BookTitle');
  const [order, setOrder] = useState('asc');
  const [openActionMenu, setOpenActionMenu] = useState<ActionMenuType>({
    open: false,
    anchorEl: null
  });

  const handleSearchInvoked = (searchValue) => {
    searchEnterPress;
    setSearchEnterPress(searchValue);
    const filteredData = lms.filter((item) => {
      return item?.BookTitle?.toLowerCase()?.includes(
        searchValue.toLowerCase()
      );
    });
    setLms(filteredData);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'search') {
      setSearch(value);
    }
  };

  const handleClearClick = () => {
    setSearch('');
    setSearchEnterPress('');
    getLMSData();
  };

  const [paginationOption, setPaginationOptions] = useState<PaginationType>({
    rowsPerPage: 5,
    page: 0
  });

  useEffect(() => {
    generateEllString();
  }, [lms]);

  const findLastSequenceNumber = () => {
    if (lms.length === 0) {
      return 0;
    }
    const sequenceArray = lms.map((eachBook) => {
      const num = eachBook.BookRefNumber.slice(4);
      return Number(num);
    });
    return Math.max(...sequenceArray);
  };

  const generateEllString = () => {
    let sequenceNumber = findLastSequenceNumber();

    const incrementedNumber = sequenceNumber + 1;

    let ellString;
    ellString = `LIB-${incrementedNumber}`;
    window.sessionStorage.setItem('BookRefNumber', ellString);
  };

  const [dialogOpen, setDialogOpen] = useState(false);

  const actionButtons = [
    {
      id: 'edit',
      label: 'Edit Book',
      iconName: 'edit',
      onClick: (_id) => () => history.push(`edit/${_id}`)
       
    },
    {
      id: 'delete',
      label: 'Delete Book',
      iconName: 'trash',
      onClick: (id) => () => setDialogOpen(id),
    }
  ];

  // const handleDelDialog = () => {
  //   history.push(`edit/${_id}`);
  // }

  const handleSort = (colName) => {
    if (orderBy === colName) {
      setOrder(order === 'asc' ? 'desc' : 'asc');
    } else {
      setOrderBy(colName);
      setOrder('asc');
    }
  };

  const handleMoreClick = (e: React.MouseEvent<HTMLButtonElement>, id) => {
    const { currentTarget } = e;
    setOpenActionMenu({
      open: id,
      anchorEl: currentTarget
    });
  };

  const handleChangePage = (_event, pageValue) => {
    const options = { ...paginationOption, page: pageValue };
    setPaginationOptions(options);
  };

  const handleChangeRowsPerPage = (event) => {
    const options = { ...paginationOption, rowsPerPage: event.target.value };
    setPaginationOptions(options);
  };

  const handleDelete = async () => {
    const response = await deleteLms(dialogOpen);
    setDialogOpen(false);
    if (response) {
      alertText = `Record deleted successfully`;
      handleClick();
       setTimeout(() => {
         getLMSData();
       }, 3000);    
    }
  };

  const handleBackClick = () => {
    history.push('/add');
  };

  const tableBody = () => {
    return (
      <Table className='static-table'>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                onClick={() => handleSort('BookRefNumber')}
                active={orderBy === 'BookRefNumber'}
                direction={order}
              >
                Book Reference Number
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                onClick={() => handleSort('BookTitle')}
                active={orderBy === 'BookTitle'}
                direction={order}
              >
                Book Title
              </TableSortLabel>
            </TableCell>
            <TableCell>Author Name</TableCell>
            <TableCell>Publication Name</TableCell>
            <TableCell>
              <TableSortLabel
                onClick={() => handleSort('PublishedDate')}
                active={orderBy === 'PublishedDate'}
                direction={order}
              >
                Published Date
              </TableSortLabel>
            </TableCell>
            <TableCell>Book Age</TableCell>
            <TableCell>Copies In Stock</TableCell>
            {/* <TableCell>Currency</TableCell> */}
            <TableCell>Book Price</TableCell>
            <TableCell>Book Ratings</TableCell>
            <TableCell>Audiobook Available</TableCell>
            <TableCell>Audio Book Available</TableCell>
            <TableCell>More Options</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {lms
            .slice(
              paginationOption.page * paginationOption.rowsPerPage,
              paginationOption.page * paginationOption.rowsPerPage +
                paginationOption.rowsPerPage
            )
            .map((lms) => (
              <TableRow key={lms._id}>
                <TableCell>{lms.BookRefNumber}</TableCell>
                <TableCell>{lms.BookTitle}</TableCell>
                <TableCell>{lms.AuthorName}</TableCell>
                <TableCell>{lms.PublicationName}</TableCell>
                <TableCell>
                  {format(new Date(lms.PublishedDate), 'dd-MM-yyyy')}
                </TableCell>
                <TableCell>{lms.BookAge}</TableCell>
                <TableCell>{lms.copiesinstock}</TableCell>
                {/* <TableCell>{lms.Currency}</TableCell> */}
                <TableCell>
                  {[lms.BookPrice, lms.Currency].join(' ')}
                  {/* {lms.BookPrice}
                  {lms.Currency} */}
                </TableCell>
                <TableCell>{lms.Bookratings}</TableCell>
                <TableCell>{String(lms.Audiobookavailable)}</TableCell>
                <TableCell>{lms.AudiobookLink}</TableCell>
                <TableCell>
                  <IconButton
                    color='gray'
                    id={'more-option'}
                    onClick={(event) => handleMoreClick(event, lms._id)}
                  >
                    <Icon name='more-vertical' id={'actionIcon'} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    );
  };

  const table = () => {
    return (
      <Table
        layout={{ variant: 'card', breakpoint: 'sm' }}
        style={{ marginLeft: '0.3rem', marginRight: '0.3rem' }}
      >
        <TableBody>{tableBody()}</TableBody>
        <TableFooter>
          <TableRow>
            <Pagination
              component='td'
              count={Object.keys(lms).length}
              rowsPerPage={paginationOption.rowsPerPage}
              rowsPerPageOptions={[5, 10, 25, 50]}
              page={paginationOption.page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    );
  };

  useEffect(() => {
    const data = [...lms];
    if (order === 'asc') {
      data.sort((a, b) => {
        return a[orderBy] > b[orderBy] ? 1 : b[orderBy] > a[orderBy] ? -1 : 0;
      });
    } else {
      data.sort((a, b) => {
        return b[orderBy] > a[orderBy] ? 1 : a[orderBy] > b[orderBy] ? -1 : 0;
      });
    }
    setLms(data);
  }, [order, orderBy]);

  return (
    <>
      {/* <Card className={classes.inline}> */}
        <Alert
          alertType='success'
          // autoHideDuration={3000}
          className={classes.inlineAlert}
          id={`${customId}_Alert`}
          open={open}
          onClose={handleClose}
          text={alertText}
          variant={INLINE_VARIANT}
        />
        {/* <CardHeader id={`${customId}_CardHeader`} title='Header Content' /> */}
      {/* </Card> */}
      <div>
        <div>
          <div style={{ marginLeft: '30px' }}>
            <Typography variant='h3' sx={{ color: colorCtaBlueBase }}>
              <u>
                <PageHeader text='Books List' />
              </u>
            </Typography>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ marginLeft: '25px', marginBottom: '20px' }}>
              <Search
                inputProps={{ 'aria-label': 'Search for an item' }}
                id='search-example'
                name='search'
                onSearchInvoked={handleSearchInvoked}
                searchEnterPress={search}
                onChange={handleChange}
                onClear={handleClearClick}
                placeholder='Book Title'
                value={search}
              />
            </div>
            <div style={{ marginRight: '30px', marginTop: '16px' }}>
              <Button onClick={handleBackClick}>Add Book</Button>
            </div>
          </div>
        </div>
        <div>{table()}</div>
      </div>
      <ActionMenu
        openActionMenu={openActionMenu}
        setOpenActionMenu={setOpenActionMenu}
        actionButtons={actionButtons}
      />
      <Confirmation
        contentText='Are you sure you want to delete this book?'
        dialogOpen={dialogOpen}
        primaryOnClick={handleDelete}
        primaryText='Delete'
        secondaryOnClick={() => setDialogOpen(false)}
        secondaryText='Cancel'
        title='Delete Book'
      />
    </>
  );
}

export default withStyles(styles)(ManageProperties);
