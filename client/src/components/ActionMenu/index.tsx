import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Popper
} from '@ellucian/react-design-system/core';
import { colorTextNeutral500 } from '@ellucian/react-design-system/core/styles/tokens';
import { Icon } from '@ellucian/ds-icons/lib';

type ActionButtonType = {
  id: string;
  label: string;
  iconName: string;
  onClick: Function;
};
type ActionMenuType = {
  openActionMenu: OpenActionMenuType;
  setOpenActionMenu: Function;
  actionButtons: ActionButtonType[];
};
type OpenActionMenuType = {
  open: false | string;
  anchorEl: null | HTMLElement;
};

const ActionMenu = (props: ActionMenuType) => {
  const { openActionMenu, setOpenActionMenu, actionButtons } = props;
  return (
    <Popper
      id='moreList'
      role='alert'
      aria-live='polite'
      data-testid='actionMenuPopper'
      arrow
      // Without aria-live="polite" the link text is never read by screen readers because role="alert" takes precedence.
      // Make sure to use this when the Popper trigger is hover.
      open={openActionMenu?.open}
      anchorEl={openActionMenu?.anchorEl}
      onClickAway={() =>
        setOpenActionMenu({
          open: false,
          anchorEl: null
        })
      }
      onClose={() =>
        setOpenActionMenu({
          open: false,
          anchorEl: null
        })
      }
      placement={'bottom-start'}
      PaperProps={{
        classes: {
          root: {
            maxWidth: '15rem',
            padding: '0.4rem',
            border: `0.063rem solid ${colorTextNeutral500}`,
            borderRadius: '0.375rem'
          }
        }
      }}
      modifiers={{
        flip: {
          enabled: true
        }
      }}
    >
      <div data-testid='actionMenuListWrapper'>
        <List data-testid='actionMenuList'>
          {actionButtons.map((eachObj) => (
            <ListItem
              key={eachObj.id}
              onClick={eachObj.onClick(openActionMenu.open)}
              style={{ cursor: 'pointer' }}
              data-testid='actionMenuListItem'
            >
              <ListItemIcon data-testid='actionMenuListItemIcon'>
                <Icon
                  name={eachObj.iconName}
                  style={{ fill: colorTextNeutral500 }}
                  data-testid={`actionMenuIcon-${eachObj.iconName}`}
                />
              </ListItemIcon>
              <ListItemText
                primary={eachObj.label}
                disableTypography={true}
                data-testid={`listText-${eachObj.label}`}
              />
            </ListItem>
          ))}
        </List>
      </div>
    </Popper>
  );
};

export default ActionMenu;
