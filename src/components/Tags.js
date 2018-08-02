import React from 'react';
import { Content, Button, ListItem, Text } from 'native-base';

import agent from '../agent';

const Tags = ({ tags, onClickTag }) => {
    if (tags) {
        return (
            <Content>
                { tags.map(tag =>  (
                    <ListItem key={tag} button
                        onPress={onClickTag(tag, page => agent.Articles.byTag(tag, page), agent.Articles.byTag(tag))}>
                            <Text>{tag}</Text>
                    </ListItem>
                ))}
            </Content>
        );
    } else {
        return (
            <Content>
                <Text>Loading Tags...</Text>
            </Content>
        );
    }
};

export default Tags;
