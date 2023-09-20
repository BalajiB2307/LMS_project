import React, { useState } from 'react';
import {
  makeStyles,
  Search,
  SimpleDialog,
  Typography
} from '@ellucian/react-design-system/core';
import { useHistory } from 'react-router-dom';
import { Icon } from '@ellucian/ds-icons/lib';
import { Styles } from './Styles';
import { DrawerModalProps, InitialType, initialTemplate } from './constants';
const useStyles = makeStyles(Styles);

const NewDrawerModal = (props: DrawerModalProps) => {
  const classes = useStyles();
  const [searchValue, setSearchValue] = useState('');
  const [templateArr, setTemplateArr] = useState<InitialType[] | []>(
    initialTemplate
  );

  const history = useHistory();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleClearClick = () => {
    setSearchValue('');
    setTemplateArr(initialTemplate);
  };

  const handleSearchInvoked = () => {
    const updatedTemplates = templateArr.filter((eachTemplate: InitialType) =>
      eachTemplate?.title.includes(searchValue)
    );
    setTemplateArr(updatedTemplates);
  };

  return (
    <SimpleDialog
      id={`newDrawerModal`}
      title='New Drawer'
      data-testid='newDrawerModal'
      onClose={() => props.setOpen(false)}
      open={props.open}
      showTitleBarClose={true}
    >
      <div
        data-testid='newDrawerModalContainer'
        className={classes.drawerContainer}
      >
        <div className={classes.shrinkContainer}>
          <Typography variant='body2' className={classes.infoText}>
            Create a new drawer using blank slate or use an existing template to
            get started.
          </Typography>
        </div>
        <div
          className={classes.shrinkContainer}
          data-testid='newDrawerModal-searchContainer'
        >
          <Search
            inputProps={{ 'aria-label': 'Search for an item' }}
            id='search-example'
            name='search'
            onSearchInvoked={handleSearchInvoked}
            onChange={handleChange}
            onClear={handleClearClick}
            placeholder='Search'
            value={searchValue}
            data-testid='newDrawerModal-searchBar'
          />
        </div>
        <div
          data-testid='newDrawerModal-templatesWrapper'
          className={classes.templatesWrapper}
        >
          <div
            key={'create-drawer'}
            data-testid='newDrawerCard'
            className={classes.templateCard}
            onClick={() => history.push('/create-drawer')}
          >
            <div data-testid='newDrawerIcon'>
              <Icon name='add'></Icon>
            </div>
            <div data-testid='newDrawerText'>
              <Typography>New Drawer</Typography>
            </div>
          </div>
          {templateArr.map((eachTemplate) => {
            return (
              <div
                data-testid={`templateCard-${eachTemplate.title}`}
                key={eachTemplate.id}
                className={classes.templateCard}
              >
                <div data-testid={`templateCard-icon-${eachTemplate.title}`}>
                  <Icon name='employment'></Icon>
                </div>
                <div data-testid={`templateCard-title-${eachTemplate.title}`}>
                  <Typography>{eachTemplate.title}</Typography>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SimpleDialog>
  );
};

export default NewDrawerModal;
