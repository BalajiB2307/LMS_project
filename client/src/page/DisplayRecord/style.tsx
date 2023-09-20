import { makeStyles } from '@ellucian/react-design-system/core';

const useStyles = makeStyles((theme) => ({
    pageContainer: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    actionContainer: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    backButtonContainer: {
        margin: '5px',
        border: 'none !important',
        '&:hover': {
            backgroundColor: '#FFFFFF !important',
            color: '#026BC8 !important'
        }
    },
    newDrawerContainer: {
        display: 'flex',
        flexDirection: 'column'
    },
    newDrawerContainerRow: {
        display: 'flex',
        justifyContent: 'flex-start',
        margin: '10px',
        gap: '2rem'
    },
    dropdown: {
        '& div[role="button"]': {
            width: '12rem'
        }
    },
    multilineContainer: {
        margin: '0'
    },
    table: {
        margin: theme.spacing(3)
    },
    addPropertyButtonContainer: {
        margin: theme.spacing(5)
    },
    dataTypeDropdown: {
        '& input[aria-hidden="true"]': {
            visibility: 'hidden !important'
        }
    }
}));

export default useStyles;
