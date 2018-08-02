import React, { PureComponent } from 'react';
import { Image } from 'react-native';
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


class Sidebar extends PureComponent {
    render () {
        const { navigation, tags, onClickTag, isAuth } = this.props;

        return (
            <Content>
                <List contentContainerStyle={{ backgroundColor: '#000', marginTop: 120  }}>
                    <User isAuth={isAuth} />
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
