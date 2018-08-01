import React from 'react';
import { View, Text, Button} from 'react-native';

import agent from '../agent';

const Tags = ({ tags, onClickTag }) => {
    if (tags) {
        return (
            <View>
                {
                    tags.map(tag =>  (
                        <Button
                            title={tag}
                            className="tag-default tag-pill"
                            key={tag}
                            onPress={onClickTag(tag, page => agent.Articles.byTag(tag, page), agent.Articles.byTag(tag))} />
                    ))
                }
            </View>
        );
    } else {
        return (
            <View>
                <Text>Loading Tags...</Text>
            </View>
        );
    }
};

export default Tags;
