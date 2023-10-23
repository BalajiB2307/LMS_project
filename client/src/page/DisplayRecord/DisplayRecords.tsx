import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import {
  Alert,
  INLINE_VARIANT,
  Button,
  CircularProgress,
  IconButton,
  Illustration,
  makeStyles,
  Pagination,
  Search,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  TableFooter,
  TableSortLabel,
  TextLink,
  Typography,
  PageHeader
} from '@ellucian/react-design-system/core';
import {
  colorCtaBlueBase,
  colorCtaTaupeActive
} from '@ellucian/react-design-system/core/styles/tokens';
import { Icon } from '@ellucian/ds-icons/lib';
import ActionMenu from '../../components/ActionMenu';
import Confirmation from '../../components/ConfirmationDialog';
import { ActionMenuType, PaginationType } from './constants';
import { getAllLMS, deleteLms } from '../../utils/HandleApi';
import { format } from 'date-fns';
import { styles } from '../DisplayRecord/style';
const useStyles = makeStyles(styles);

// eslint-disable-next-line react/prop-types
function ManageProperties( ) {
  const classes = useStyles();
  const [lms, setLms] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const lmsRefData = useRef([]);
  const [IllustrationMsg, setIllustrationMsg] = useState('');

  useEffect(() => {
    getLMSData();
  }, []);

  const getLMSData = async () => {
    try{
      const response = await getAllLMS();
      setLoading(false);
      setLms(response);
      lmsRefData.current = response;
      if(response?.length == 0){
        setIllustrationMsg('No Book(s) to display')
      }
    } catch(error) {
      setLoading(false);
      setIllustrationMsg('Something went wrong, Contact your Administrator');
    }
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
  const [orderBy, setOrderBy] = useState('BookTitle');
  const [order, setOrder] = useState('asc');
  const [openActionMenu, setOpenActionMenu] = useState<ActionMenuType>({
    open: false,
    anchorEl: null
  });

  const handleSearchInvoked = (searchValue) => {
    // eslint-disable-next-line no-unused-expressions
    const filteredData = lmsRefData.current.filter((item) => {
      return item?.BookTitle?.toLowerCase()?.includes(
        searchValue.toLowerCase()
      );
    });
    if(filteredData?.length == 0){
      setIllustrationMsg('No Book(s) to display');
    }
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
    getLMSData();
  };

  const [paginationOption, setPaginationOptions] = useState<PaginationType>({
    rowsPerPage: 2,
    page: 0
  });

  useEffect(() => {
    generateEllString();
  }, [lms]);

  const findLastSequenceNumber = () => {
    if (lms?.length === 0) {
      return 0;
    }
    const sequenceArray = lms?.map((eachBook) => {
      const num = eachBook.BookRefNumber.slice(4);
      return Number(num);
    }) || [];
    return Math.max(...sequenceArray);
  };

  const generateEllString = () => {
    const sequenceNumber = findLastSequenceNumber();
    const incrementedNumber = sequenceNumber + 1;
    const ellString = `LIB-${incrementedNumber}`;
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
      onClick: (id) => () => setDialogOpen(id)
    }
  ];

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
            <TableCell>Audio Book URL</TableCell>
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
              // eslint-disable-next-line no-underscore-dangle
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
                <TableCell>{[lms.BookPrice, lms.Currency].join(' ')}</TableCell>
                <TableCell>{lms.Bookratings}</TableCell>
                <TableCell>{String(lms.Audiobookavailable)}</TableCell>
                <TableCell>
                  <TextLink
                    onClick={() => {
                      window.open(
                        `/${lms.AudiobookLink}`,
                        '_blank',
                        'noopener, noreferrer'
                      );
                    }}
                  >
                    {lms.AudiobookLink}
                  </TextLink>
                </TableCell>
                <TableCell>
                  <IconButton
                    color='gray'
                    id={'more-option'}
                    // eslint-disable-next-line no-underscore-dangle
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
    if (lms?.length > 0) {
      return (
        <Table
          layout={{ variant: 'card', breakpoint: 'sm' }}
          className={classes.tableStyle}
        >
          <TableBody>{tableBody()}</TableBody>
          <TableFooter>
            <TableRow>
              <Pagination
                component='td'
                count={Object.keys(lms).length}
                rowsPerPage={paginationOption.rowsPerPage}
                rowsPerPageOptions={[2, 5, 10]}
                page={paginationOption.page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      );
    } else {
      return (
        <>
          <div className={classes.illustrationStyle}>
            <Illustration name='no-messages' />{' '}
          </div>
          <div
            className = {classes.illustrationStyle}
          >
            <Typography variant='h2' sx={{ color: colorCtaTaupeActive }}>
              {IllustrationMsg}
            </Typography>
          </div>
        </>
      );
    }
  };

  useEffect(() => {
    const data = [...lms];
    if (order === 'asc') {
      data.sort((a, b) => {
        // eslint-disable-next-line no-nested-ternary
        return a[orderBy] > b[orderBy] ? 1 : b[orderBy] > a[orderBy] ? -1 : 0;
      });
    } else {
      data.sort((a, b) => {
        // eslint-disable-next-line no-nested-ternary
        return b[orderBy] > a[orderBy] ? 1 : a[orderBy] > b[orderBy] ? -1 : 0;
      });
    }
    setLms(data);
  }, [order, orderBy]);

  return (
    <>
      <Alert
        alertType='success'
        autoHideDuration={1500}
        // eslint-disable-next-line react/prop-types
        className={classes.inlineAlert}
        id={`${customId}_Alert`}
        open={open}
        onClose={handleClose}
        text={alertText}
        variant={INLINE_VARIANT}
      />
      <div>
        <div>
          <div className={classes.pageTitleStyle}>
            <Typography variant='h3' sx={{ color: colorCtaBlueBase }}>
              <u>
                <PageHeader text='Books List' />
              </u>
            </Typography>
          </div>
          <div className={classes.addBookStyle}>
            <div className={classes.searchBookStyle}>
              <Search
                inputProps={{ 'aria-label': 'Search for an item' }}
                id='search-example'
                name='search'
                onSearchInvoked={handleSearchInvoked}
                // searchEnterPress={search}
                onChange={handleChange}
                onClear={handleClearClick}
                placeholder='Book Title'
                value={search}
                disabled={lms?.length == 0 && search == ''}
              />
            </div>
            <div className={classes.backButtonStyle}>
              <Button onClick={handleBackClick}>Add Book</Button>
            </div>
          </div>
        </div>
        {/* <div>{table()}</div> */}
        {loading ? (
          <div
            className={classes.loaderContainer}
            data-testid='loaderContainer'
          >
            <div style = {{display:'flex', justifyContent:'center' }}><CircularProgress data-testid='circular-progress' /></div>
          </div>
        ) : (
          table()
        )}
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
