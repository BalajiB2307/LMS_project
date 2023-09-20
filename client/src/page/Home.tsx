import { withStyles } from '@ellucian/react-design-system/core/styles';
import { spacing20 } from '@ellucian/react-design-system/core/styles/tokens';
//import { Typography, TextLink } from '@ellucian/react-design-system/core';
import PropTypes from 'prop-types';
import React from 'react';
import { usePageControl } from '@ellucian/experience-extension-utils';

const styles = () => ({
    card: {
        margin: `0 ${spacing20}`
    }
});

const HomePage = (props) => {
    const { classes } = props;
    const { setPageTitle } = usePageControl();

    setPageTitle('Props and Hooks');

    return (
        <div className={classes.card}>
            <h1> Demo Home page </h1>{' '}
        </div>
    );
};

HomePage.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HomePage);
