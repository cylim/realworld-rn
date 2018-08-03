import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Drawer } from 'native-base';


import {
    HOME_PAGE_LOADED,
    HOME_PAGE_UNLOADED,
    APPLY_TAG_FILTER
} from '../constants/actionTypes';
import agent from '../agent';
import Sidebar from '../components/Sidebar';
import AppHeader from '../components/AppHeader';
import ArticleList from '../components/ArticleList';

const TEMP_AUTH = false;

const mapStateToProps = state => ({
    ...state.home,
    ...state.articleList,
    tags: state.home.tags,
    appName: state.common.appName,
    token: state.common.token
});

const mapDispatchToProps = dispatch => ({
    onClickTag: (tag, pager, payload) =>
        dispatch({ type: APPLY_TAG_FILTER, tag, pager, payload }),
    onLoad: (tab, pager, payload) =>
        dispatch({ type: HOME_PAGE_LOADED, tab, pager, payload }),
    onUnload: () =>
        dispatch({ type: HOME_PAGE_UNLOADED })
});

class Home extends Component {
    componentDidMount() {
        const tab = this.props.token ? 'feed' : 'all';
        const articlesPromise = this.props.token ?
            agent.Articles.feed :
            agent.Articles.all;

        this.props.onLoad(tab, articlesPromise, Promise.all([agent.Tags.getAll(), articlesPromise()]));
    }

    componentWillUnmount() {
        this.props.onUnload();
    }

    onSelectedTag = (...args) => {
        this.props.onClickTag(args[0], args[1], args[2]);
        this.closeDrawer();
    }

    goToArticle = (slug) => {
        this.props.navigation.navigate('Article', { slug });
    }

    goToAuthor = (username) => {
        this.props.navigation.navigate('User', { username });
    }

    openDrawer = () => {this.drawer._root.open()}
    closeDrawer = () =>  {this.drawer._root.close()}

    render() {
        const { navigation, tags, pager, articles, loading, articlesCount, currentPage } = this.props;
        console.log(navigation);
        return (
            <Drawer
                ref={(ref) => { this.drawer = ref; }}
                onClose={this.closeDrawer}
                content={<Sidebar 
                    isAuth={TEMP_AUTH}
                    navigation={navigation}
                    tags={tags}
                    onClickTag={this.onSelectedTag}
                />} >
                    <AppHeader
                        openSidebar={this.openDrawer}
                        title='Feeds'
                        isAuth={TEMP_AUTH}
                    />
                    <ArticleList
                        pager={pager}
                        articles={articles}
                        loading={loading}
                        articlesCount={articlesCount}
                        currentPage={currentPage}
                        goToArticle={this.goToArticle}
                        goToAuthor={this.goToAuthor} />
            </Drawer>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);