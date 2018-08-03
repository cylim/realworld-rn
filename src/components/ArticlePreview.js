import React from 'react';
import { connect } from 'react-redux';
import { Button, Text, Icon, Thumbnail, ListItem, Title, Subtitle, Left, Body, Right } from 'native-base';
import { TouchableWithoutFeedback, View, StyleSheet } from 'react-native';

import agent from '../agent';
import { ARTICLE_FAVORITED, ARTICLE_UNFAVORITED } from '../constants/actionTypes';

const mapDispatchToProps = dispatch => ({
    favorite: slug => dispatch({
        type: ARTICLE_FAVORITED,
        payload: agent.Articles.favorite(slug)
    }),
    unfavorite: slug => dispatch({
        type: ARTICLE_UNFAVORITED,
        payload: agent.Articles.unfavorite(slug)
    })
});

const ArticlePreview = props => {
    const article = props.article;

    const handleClick = () => {
        if (article.favorited) {
            props.unfavorite(article.slug);
        } else {
            props.favorite(article.slug);
        }
    };
    
    return (
        <ListItem onPress={() => props.goToArticle(article.slug)}>
            <Body style={styles.container} >
                <View style={styles.user}>
                    <TouchableWithoutFeedback onPress={() => props.goToAuthor(article.author.username)}>
                        <Thumbnail small source={{
                            uri: article.author.image || 'https://static.productionready.io/images/smiley-cyrus.jpg'
                        }} />
                    </TouchableWithoutFeedback>
                    <View style={styles.username}>
                        <TouchableWithoutFeedback onPress={() => props.goToAuthor(article.author.username)}>
                            <Title style={{ fontSize: 16 }}>{article.author.username}</Title>
                        </TouchableWithoutFeedback>
                        <Subtitle style={styles.subtitle}>{new Date(article.createdAt).toDateString()}</Subtitle>
                    </View>
                    <Button rounded bordered onPress={handleClick}>
                        <Icon active={article.favorited} name='heart' />
                        <Text>{article.favoritesCount}</Text>
                    </Button>
                </View>
                <View style={styles.article}>
                    <View style={styles.tags}>
                        {article.tagList.slice(0, 3).map(tag => (
                            <View key={tag} style={styles.tag}>
                                <Text style={{ fontSize: 12 }}>{tag}</Text>
                            </View>
                        ))}
                    </View>
                    <Title>{article.title}</Title>
                    <Subtitle style={styles.subtitle}>{article.description}</Subtitle>
                    <Subtitle>Read more...</Subtitle>
                </View>
            </Body>
        </ListItem>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        width: '100%',
    },
    user: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 16,
    },
    username: {
        flex: 2,
        flexDirection: 'column',
        alignItems: 'flex-start',
        paddingLeft: 4,
    },
    article: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    subtitle: { 
        fontSize: 14,
        paddingTop: 8,
        paddingBottom: 12,
    },
    tags: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        alignSelf: 'flex-end',
        flexWrap: 'wrap',
        paddingBottom: 8,
    },
    tag: {
        borderColor: 'grey',
        borderWidth: 1,
        backgroundColor: 'skyblue',
        borderRadius: 8,
        margin: 2,
        padding: 4,
    }
})

export default connect(() => ({}), mapDispatchToProps)(ArticlePreview);
