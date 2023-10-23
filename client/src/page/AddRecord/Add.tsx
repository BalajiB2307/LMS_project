/* eslint-disable radix */
/* eslint-disable complexity */
import React, { useState, useEffect } from 'react';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import {
  Alert,
  Button,
  FormControl,
  FormControlLabel,
  Card,
  CardContent,
  Checkbox,
  DatePicker,
  Dropdown,
  DropdownItem,
  INLINE_VARIANT,
  makeStyles,
  TextField,
  Typography,
  PageHeader
} from '@ellucian/react-design-system/core';

import { addLms, getByID, updateLms } from '../../utils/HandleApi';
import { useParams, useHistory } from 'react-router-dom';
import { colorCtaBlueBase } from '@ellucian/react-design-system/core/styles/tokens';
import { styles } from '../AddRecord/style';
const useStyles = makeStyles(styles);

const LMSAdd = ( ) => {
  const classes = useStyles();
  const history = useHistory();
  const { _id } = useParams();

  const [spacing] = React.useState(2);
  const CurOptions = ['Dollar(s)', 'Yen', 'Rupee(s)'];
  const RatingOptions = ['*', '**', '***', '****', '*****'];

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const [alertText, setAlertText] = useState('');
  const customId = 'AlertTimeoutExample';

  const initValues = {
    BookRefNumber: '',
    BookTitle: '',
    AuthorName: '',
    PublicationName: '',
    PublishedDate: null,
    BookAge: '',
    copiesinstock: '',
    Currency: '',
    BookPrice: '',
    Bookratings: '',
    Audiobookavailable: false,
    AudiobookLink: ''
  };
  const [data, setData] = useState(initValues);
  const errorInitValues = {
    BookRefNumber: '',
    BookTitle: '',
    AuthorName: '',
    PublicationName: '',
    PublishedDate: '',
    BookAge: '',
    copiesinstock: '',
    Currency: '',
    BookPrice: '',
    Bookratings: '',
    AudiobookLink: ''
  };
  const [error, setError] = useState(errorInitValues);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value
    });
  };
  const handleCheckboxChange = (event) => {
    event.preventDefault();
    setData({
      ...data,
      Audiobookavailable: event.target.checked
    });
  };

  const recordID = 'LMSAdd';

  const validateField = () => {
    const curObj = { ...errorInitValues };
    const pattern = /^[a-zA-Z0-9 -]+$/;
    const patternNum = /^[0-9]+$/;
    const patternCurr = /^[-+]?\d*\.?\d+$/;
    const patternUrl = /^((http(s?)?):\/\/)?([wW]{3}\.)[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/g;
    const errMsg = 'Only alphabets, hyphen, space and numbers are allowed';
    const arr = Object.keys(errorInitValues).map((each) => {
      if (data[each] === '' || data[each] === null) {
        curObj[each] = 'This field cannot be empty';
        return false;
      }
      if (each == 'PublishedDate') {
        const currentDate = new Date();
        const actDate = new Date(data.PublishedDate);
        actDate.setHours(0, 0, 0, 0);
        currentDate.setHours(0, 0, 0, 0);
        if (actDate > currentDate) {
          curObj[each] = 'Date cannot be in future';
          return false;
        }
      }
      if (each === 'AudiobookLink') {
        if ( data.Audiobookavailable == true ){
          if (!patternUrl.test(data.AudiobookLink)) {
            curObj[each] = 'Invalid URL';
            return false;
          }
        }
      }
      if ( each === 'BookTitle' ) {
        if (
          !(
            pattern.test(data.BookTitle)
          )
        ) {
          curObj[each] = errMsg;
          return false;
        }
      }
      if ( each === 'AuthorName' ){
        if (
          !(
            pattern.test(data.AuthorName)
          )
        ) {
          curObj[each] = errMsg;
          return false;
        }
      }
      if ( each === 'PublicationName' ){
        if (
          !(
            pattern.test(data.PublicationName)
          )
         ) {
          curObj[each] = errMsg;
          return false;
        }
      }
      if (each === 'copiesinstock') {
        if (
          !patternNum.test(data.copiesinstock)
        ) {
          curObj[each] = 'Only numbers are allowed';
          return false;
        }
        if (
          parseInt(data.copiesinstock) < 0 ||
          parseInt(data.copiesinstock) === 0
        ) {
          curObj[each] = 'Must be greater than zero';
          return false;
        }
      }
      if (each === 'BookPrice') {
        if (!patternCurr.test(data.BookPrice)) {
          curObj[each] = 'Only numbers are allowed';
          return false;
        }
         if (
           parseInt(data.BookPrice) < 0 ||
           parseInt(data.BookPrice) === 0
         ) {
           curObj[each] = 'Must be greater than zero';
           return false;
         }
      }

      return true;
    });
    setError(curObj);
    return arr.every((eachValue) => eachValue);
  };

  const handleAddLMS = async () => {
    // eslint-disable-next-line new-cap
    const resVal = await AddCall();
    if (resVal.toUpperCase() === 'OK') {
      setTimeout(() => {
        history.push('/home');
      }, 3000);
    }
  };

  const AddCall = async () => {
    const isValid = validateField();
    let resVal = 'fail';
    if (isValid) {
      if (_id) {
        try {
          if (data.Audiobookavailable == false ){
            data.AudiobookLink = '';
          }
            const response: any = await updateLms({ ...data, _id: _id });
          resVal = response.statusText;
          setAlertText(`${data.BookRefNumber} Record updated successfully`);
        } catch (error) {
          setAlertText('Error in update API');
        } finally {
          setOpen(true);
        }
      } else {
        try{
          const response: any = await addLms({ ...data });
          resVal = response.statusText;
          setAlertText(`${data.BookRefNumber} Record Added successfully`);
        } catch (error){
          setAlertText('Error in Add API');
        } finally {
          setOpen(true);
        }
      }
    }
    return resVal;
  }

  const handleListClick = () => {
    history.push('/home');
  };

  const handleClearClick = () => {
    const curObj = { ...errorInitValues };
    setError(curObj)
    setData(initValues);
  };

  const getByBookID = async () => {
    const response: any = await getByID(_id);
    const { _id: ID, __v, ...rest } = response;
    setData(rest);
  };

  const calculateAge = () => {
    const pDate = data.PublishedDate;
    if (pDate !== null) {
      const d1 = new Date(pDate);
      const d3 = new Date(Date.now());
      const diffInMilliseconds =  d3.getTime() - d1.getTime();
      const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
      const diffInMonths = Math.floor(diffInDays/30);
      const diffInYears = d3.getFullYear() - d1.getFullYear();
      if(diffInYears > 0){
        setData({ ...data, BookAge: [String(diffInYears), 'year(s)'].join(' ') });
      }else if(diffInMonths > 0){
        setData({
          ...data,
          BookAge: [String(diffInMonths), 'month(s)'].join(' ')
        });
      }else{
        setData({
          ...data,
          BookAge: [String(diffInDays), 'day(s)'].join(' ')
        });
      }
    }
  };

  useEffect(() => {
    calculateAge();
  }, [data.PublishedDate]);

  useEffect(() => {
    const idFromSession = window.sessionStorage.getItem('BookRefNumber');
    setData({ ...data, BookRefNumber: idFromSession });
  }, []);

  useEffect(() => {
    if (_id) {getByBookID();}
  }, []);

  return (
    <div className={classes.alertStyle}>
      <Alert
        alertType={alertText.includes('uccessfully') ? 'success' : 'error'}
        autoHideDuration={2000}
        className={classes.inlineAlert}
        id={`${customId}_Alert`}
        open={open}
        onClose={handleClose}
        text={alertText}
        variant={INLINE_VARIANT}
      />
      <Card container spacing={spacing}>
        <CardContent>
          <form>
            <div>
              <FormControl
                className={classes.formStyle}
                id={`${recordID}_Container`}
                component='fieldset'
              >
                <Typography
                  gutterBottom
                  id={`${recordID}_InternshipTitle`}
                  variant='h3'
                  sx={{ color: colorCtaBlueBase }}
                >
                  <u>
                    <PageHeader text='Add Book Details' />
                  </u>
                </Typography>
                <div className={classes.textFieldStyle}>
                  <TextField
                    name='BookTitle'
                    label='Book Title'
                    fullWidth={true}
                    required={true}
                    value={data.BookTitle}
                    onChange={handleChange}
                    error={error.BookTitle !== ''}
                    helperText={error.BookTitle}
                  />
                </div>
                <div className={classes.textFieldStyle}>
                  <TextField
                    name='AuthorName'
                    label='Author Name'
                    fullWidth={true}
                    required={true}
                    value={data.AuthorName}
                    onChange={handleChange}
                    error={error.AuthorName !== ''}
                    helperText={error.AuthorName}
                  />
                </div>
                <div className={classes.textFieldStyle}>
                  <TextField
                    name='PublicationName'
                    label='Publication Name'
                    fullWidth={true}
                    required={true}
                    value={data.PublicationName}
                    onChange={handleChange}
                    error={error.PublicationName !== ''}
                    helperText={error.PublicationName}
                  />
                </div>
                <div className={classes.textFieldStyle}>
                  <DatePicker
                    maxDate={new Date()}
                    id='required-datepicke'
                    name='PublishedDate'
                    required={true}
                    fullWidth={true}
                    value={
                      data?.PublishedDate ? new Date(data.PublishedDate) : null
                    }
                    onDateChange={(date) => {
                      setData({
                        ...data,
                        PublishedDate: date
                      });
                    }}
                    label='Published Date'
                    placeholder='MM/DD/YYYY'
                    error={error.PublishedDate !== ''}
                    helperText={error.PublishedDate}
                  />
                </div>
                <div className={classes.textFieldStyle}>
                  <TextField
                    name='BookAge'
                    label='Book Age'
                    fullWidth={true}
                    value={data.BookAge}
                    readOnly={true}
                    disabled={true}
                  />
                </div>
                <div className={classes.textFieldStyle}>
                  <TextField
                    name='copiesinstock'
                    label='No. of copies in stock'
                    fullWidth={true}
                    required={true}
                    value={data.copiesinstock}
                    onChange={handleChange}
                    error={error.copiesinstock !== ''}
                    helperText={error.copiesinstock}
                  />
                </div>
                <div className={classes.textFieldStyle}>
                  <Dropdown
                    name='Currency'
                    className={classes.dropdown}
                    required={true}
                    fullWidth={true}
                    label='Currency'
                    onChange={handleChange}
                    value={data.Currency}
                    error={error.Currency !== ''}
                    helperText={error.Currency}
                  >
                    {CurOptions.map((option) => (
                      <DropdownItem
                        key={option}
                        label={option}
                        value={option}
                      />
                    ))}
                  </Dropdown>
                </div>
                <div className={classes.textFieldStyle}>
                  <TextField
                    name='BookPrice'
                    label='Book Price'
                    required={true}
                    fullWidth={true}
                    value={data.BookPrice}
                    onChange={handleChange}
                    error={error.BookPrice !== ''}
                    helperText={error.BookPrice}
                  />
                </div>
                <div className={classes.textFieldStyle}>
                  <Dropdown
                    className={classes.dropdown}
                    name='Bookratings'
                    label='Reader Rating'
                    required={true}
                    fullWidth={true}
                    onChange={handleChange}
                    value={data.Bookratings}
                    error={error.Bookratings !== ''}
                    helperText={error.Bookratings}
                  >
                    {RatingOptions.map((option) => (
                      <DropdownItem
                        key={option}
                        label={option}
                        value={option}
                      />
                    ))}
                  </Dropdown>
                </div>
                <div className={classes.textFieldStyle}></div>
                <div>
                  <FormControlLabel
                    name='Audiobookavailable'
                    label='Audio Book Available'
                    fullWidth={true}
                    alignItems='left'
                    control={
                      <Checkbox
                        type='checkbox'
                        checked={data.Audiobookavailable}
                        onChange={handleCheckboxChange}
                      />
                    }
                  />
                </div>
                {data.Audiobookavailable == true && (
                  <div className={classes.textFieldStyle}>
                    <TextField
                      name='AudiobookLink'
                      label='Audio Link'
                      fullWidth={true}
                      value={data.AudiobookLink}
                      onChange={handleChange}
                      error={error.AudiobookLink !== ''}
                      helperText={error.AudiobookLink}
                    />
                  </div>
                )}
                <div style={{ marginBottom: '3px' }}></div>
                <div className={classes.allButtonsStyle}>
                  <Button
                    color='primary'
                    size='default'
                    variant='contained'
                    className={classes.buttonSpaceStyle}
                    onClick={handleAddLMS}
                  >
                    SAVE
                  </Button>
                  <Button
                    color='secondary'
                    size='default'
                    variant='contained'
                    onClick={handleListClick}
                  >
                    BOOKS LIST
                  </Button>
                  <div style={{ marginLeft: '0.3rem' }}>
                    <Button
                      color='secondary'
                      size='default'
                      variant='contained'
                      onClick={handleClearClick}
                    >
                      CLEAR
                    </Button>
                  </div>
                </div>
              </FormControl>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default withStyles(styles)(LMSAdd);
