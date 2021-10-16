import React, { useState } from 'react'
import {
    makeStyles,
    Drawer,
    Typography,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    AppBar,
    Toolbar,
    Avatar,
    IconButton,
} from '@material-ui/core'
import { AddCircleOutlined, SubjectOutlined, Menu } from '@material-ui/icons';
import { useHistory, useLocation } from 'react-router';
import format from 'date-fns/format';
import useWindowSize from './WindowSz';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => {
    return {
        page: {
            background: '#f9f9f9',
            width: '100%',
            minHeight: '94vh',
            padding: theme.spacing(3)
        },
        drawer: {
            width: drawerWidth,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        root: {
            display: 'flex'
        },
        active: {
            background: '#f4f4f4'
        },
        title: {
            padding: theme.spacing(2)
        },
        appbar: {
            width: `calc(100% - ${drawerWidth}px)`
        },
        toolbar: theme.mixins.toolbar,
        date: {
            flexGrow: 1
        },
        avatar: {
            marginLeft: theme.spacing(2)
        }
    }
})

const Layout = ({ children }) => {

    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const wSize = useWindowSize();
    const [openD, setOpenD] = useState(false);

    const menuItems = [
        {
            text: 'My Notes',
            icon: <SubjectOutlined color='secondary' />,
            path: '/'
        },
        {
            text: 'Create Notes',
            icon: <AddCircleOutlined color='secondary' />,
            path: '/create'
        }
    ];


    return (
        <div className={classes.root}>
            {/* App bar */}
            <AppBar className={wSize.width > 700 && classes.appbar} elevation={0}>
                <Toolbar>
                    {wSize.width < 700 &&
                        (
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}
                                onClick={() => setOpenD(true)}
                            >
                                <Menu />
                            </IconButton>
                        )
                    }
                    <Typography className={classes.date}>
                        Today is the {format(new Date(), 'do MMMM Y')}
                    </Typography>
                    <Typography>
                        Mario
                    </Typography>
                    <Avatar src='/mario-av.png' className={classes.avatar} />
                </Toolbar>
            </AppBar>
            {/* Side drawer */}
            {wSize.width > 700 ?
                (
                    <Drawer
                        className={classes.drawer}
                        variant='permanent'
                        anchor='left'
                        classes={{ paper: classes.drawerPaper }}
                    >
                        <div>
                            <Typography variant='h5' className={classes.title}>
                                Ninja Notes
                            </Typography>
                        </div>

                        <List>
                            {menuItems.map((item) => (
                                <ListItem
                                    key={item.text}
                                    button
                                    onClick={() => history.push(item.path)}
                                    className={location.pathname == item.path && classes.active}
                                >
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.text} />
                                </ListItem>
                            ))}
                        </List>

                    </Drawer>
                )
                :
                (
                    <Drawer
                        className={classes.drawer}
                        classes={{ paper: classes.drawerPaper }}
                        variant='temporary'
                        open={openD}
                    >
                        <div>
                            <Typography variant='h5' className={classes.title}>
                                Ninja Notes
                            </Typography>
                        </div>

                        <List>
                            {menuItems.map((item) => (
                                <ListItem
                                    key={item.text}
                                    button
                                    onClick={() => {
                                        history.push(item.path)
                                        setOpenD(!openD)
                                    }}
                                    className={location.pathname == item.path && classes.active}
                                >
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.text} />
                                </ListItem>
                            ))}
                        </List>
                    </Drawer>
                )
            }

            <div className={classes.page}>
                <div className={classes.toolbar} ></div>
                {children}
            </div>
        </div>
    )
}

export default Layout
