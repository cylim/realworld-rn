import React from 'react';
import { Content, Text, List } from 'native-base';

import ArticlePreview from './ArticlePreview';
import ListPagination from './ListPagination';


const ArticleList = props => {
    if (!props.articles) {
        return (
            <Content className="article-preview">
                <Text>Loading...</Text>
            </Content>
        );
    }

    if (props.articles.length === 0) {
        return (
            <Content className="article-preview">
                <Text>No articles are here... yet.</Text>
            </Content>
        );
    }

    return (
        <Content>
            <List style={{
                backgroundColor: '#fff'
            }}>
                {
                    props.articles.map(article => {
                        return (
                            <ArticlePreview
                                article={article} 
                                key={article.slug} 
                                goToArticle={props.goToArticle}
                                goToAuthor={props.goToAuthor} />
                        );
                    })
                }

                <ListPagination
                    pager={props.pager}
                    articlesCount={props.articlesCount}
                    currentPage={props.currentPage} />
            </List>
        </Content>
    );
};

export default ArticleList;

