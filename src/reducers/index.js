import { combineReducers } from 'redux';

import article from './article';
import articleList from './articleList';
import auth from './auth';
import common from './common';
import editor from './editor';
import home from './home';
import profile from './profile';
import settings from './settings';

export default combineReducers({
    article,
    articleList,
    auth,
    common,
    editor,
    home,
    profile,
    settings,
});
