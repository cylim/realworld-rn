import React from 'react';
import { Header, Left, Body, Right, Button, Icon, Title } from 'native-base';


const AppHeader = ({ openSidebar, title, isAuth }) => (
    <Header>
        <Left>
            <Button transparent onPress={openSidebar}>
                <Icon type='MaterialIcons' name='menu' />
            </Button>
        </Left>
        <Body>
            <Title>{title}</Title>
        </Body>
        <Right>
            <Button transparent disabled={!isAuth}>
                <Icon type='MaterialIcons' name='add' />
            </Button>
        </Right>
    </Header>
)

export default AppHeader;