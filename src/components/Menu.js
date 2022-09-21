import {forwardRef, useEffect, useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Menu as RAMenu, MenuItemLink, useDataProvider, useLogout, useResourceDefinitions } from 'react-admin';
import { AppBar, UserMenu, useTranslate } from 'react-admin';
import DefaultIcon from '@material-ui/icons/ViewList';
import SettingsIcon from '@material-ui/icons/Settings';
import InfoIcon from '@material-ui/icons/Info';
import { Typography } from '@material-ui/core';
import preval from 'preval.macro'
import { MenuItem } from '@mui/material';
import ExitIcon from '@mui/icons-material/PowerSettingsNew';


const useStyles = makeStyles({
    title: {},
    spacer : {flex: 1},
});


const MyLogoutButton = forwardRef((props, ref) => {
    const logout = useLogout();
    const handleClick = () => logout();
    return (
        <MenuItem
            onClick={handleClick}
            ref={ref}
        >
            <ExitIcon /> Logout
        </MenuItem>
    );
});


const ConfigurationMenu = forwardRef((props, ref) => {
    const translate = useTranslate();
    return (
        <MenuItemLink
            ref={ref}
            to="/configuration"
            primaryText={translate('Settings' )}
            leftIcon={<SettingsIcon />}
            onClick={props.onClick}
            sidebarIsOpen
        />
    );
});

const CustomUserMenu = (props) => (
    <UserMenu {...props} >
        <ConfigurationMenu />
        <MenuItemLink primaryText={preval`module.exports = new Date().toString().split(' ').slice(1,3).join('');`} to="/#/info" leftIcon={<InfoIcon />}/>
        <MyLogoutButton />
    </UserMenu>
);

export const CustomAppBar = (props) => {
    const classes = useStyles();
    return (
        <AppBar {...props} elevation={1} userMenu={<CustomUserMenu className={classes.menu} />}>
            <Typography
                variant="h6"
                color="inherit"
                className={classes.title}
                id="react-admin-title"
            />
            <span className={classes.spacer} />
        </AppBar>
    );
};

const onMenuClick = (evt) => {
    //console.log(`Menu Click`, evt);
}

export const Menu = (props) => {
    const resourcesDefinitions = useResourceDefinitions();
    const resources = Object.keys(resourcesDefinitions).map(name => resourcesDefinitions[name]);    
    const open = true;
    return (
        <RAMenu {...props}>
            {resources.map(resource => 
                <MenuItemLink
                    key={resource.name}
                    to={`/${resource.name}`}
                    primaryText={
                        (resource.options && resource.options.label) ||
                        resource.name
                    }
                    leftIcon={
                        resource.icon ? <resource.icon /> : <DefaultIcon />
                    }
                    onClick={onMenuClick}
                    sidebarIsOpen={true}
                />
            )}
        </RAMenu>
    );
};