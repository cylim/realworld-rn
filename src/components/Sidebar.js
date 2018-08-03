import React, { PureComponent } from 'react';
import { Content, List, ListItem, Text, Separator } from 'native-base';

import Tags from './Tags';
import agent from '../agent';

const mainRoutes = [
    { route: 'Home', title: 'Global Feeds' },
    { route: 'Home', title: 'My Articles' },
    { route: 'Home', title: 'My Favorites' },
]


const MainList = ({isAuth, navigation}) => {
    return isAuth
        ? mainRoutes.map(item => (
            <ListItem button
                onPress={() => navigation.navigate(item.route, item.props || {})}>
                <Text>{item.title}</Text>
            </ListItem>
        ))
        : <ListItem button
            onPress={() => navigation.navigate('Home')}>
            <Text>Global Feeds</Text>
        </ListItem>
}

const UserSidebar = ({ isAuth }) => {
    return isAuth 
        ? <ListItem style={{ height: 200 }}>
            <Text>User</Text>
        </ListItem>
        : <ListItem style={{ height: 200 }}>
            <Text>Login</Text>
        </ListItem>
}


class Sidebar extends PureComponent {
    render () {
        const { navigation, tags, onClickTag, isAuth } = this.props;

        return (
            <Content>
                <List style={{ backgroundColor: '#fff' }}>
                    <UserSidebar isAuth={isAuth} />
                    <MainList
                        isAuth={isAuth} 
                        navigation={navigation} />
                    <Separator bordered>
                        <Text>Tags</Text>
                    </Separator>
                    { tags
                        ? tags.map(tag => (
                            <ListItem key={tag} button
                                onPress={onClickTag(tag, 
                                    page => agent.Articles.byTag(tag, page), 
                                    agent.Articles.byTag(tag))}>
                                <Text>{tag}</Text>
                            </ListItem>
                        ))
                        : <ListItem>
                            <Text>Loading Tags...</Text>
                        </ListItem>
                    }
                </List>
            </Content>
        )
    }    
};

export default Sidebar;
