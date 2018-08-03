import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, ListItem, Body } from 'native-base';

import agent from '../agent';
import { connect } from 'react-redux';
import { SET_PAGE } from '../constants/actionTypes';

const mapDispatchToProps = dispatch => ({
    onSetPage: (page, payload) =>
        dispatch({ type: SET_PAGE, page, payload })
});

const ListPagination = props => {
    if (props.articlesCount <= 10) {
        return null;
    }

    const range = [];
    for (let i = 0; i < Math.ceil(props.articlesCount / 10); ++i) {
        range.push(i);
    }

    const setPage = page => {
        if (props.pager) {
            props.onSetPage(page, props.pager(page));
        } else {
            props.onSetPage(page, agent.Articles.all(page))
        }
    };

    return (
        <ListItem>
            <Body style={styles.containers}>
                {
                    range.map(v => {
                        const isCurrent = v === props.currentPage;
                        return (
                            <Button bordered={!isCurrent} style={styles.pager} onPress={() => setPage(v)} key={v.toString()}>
                                <Text>{v + 1}</Text>
                            </Button>
                        );
                    })
                }
            </Body>
        </ListItem>
    );
};

const styles = StyleSheet.create({
    containers: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingBottom: 8,
        justifyContent: 'space-evenly'
    },
    pager: {
        margin: 2,
    }
})


export default connect(() => ({}), mapDispatchToProps)(ListPagination);
