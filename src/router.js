import Vue from 'vue';
import Router from 'vue-router';
import { Lazyload, Cell, CellGroup } from 'vant';
import vantCss from 'vant-css';

Vue.use(Router);
Vue.use(Lazyload);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(vantCss);

const Login = r => require.ensure([], () => r(require('./view/login')), 'login');
const User = r => require.ensure([], () => r(require('./view/user')), 'user');
const Video = r => require.ensure([], () => r(require('./view/video')), 'video');
const Ask = r => require.ensure([], () => r(require('./view/ask')), 'ask');
const Home = r => require.ensure([], () => r(require('./view/home')), 'home');
const PublishArticle = r => require.ensure([], () => r(require('./view/publishArticle')), 'publishArticle');
const ArticleDetail = r => require.ensure([], () => r(require('./view/articleDetail')), 'ArticleDetail');
const PublishPic = r => require.ensure([], () => r(require('./view/publishVideo')), 'PublishPic');
const PublishAsk = r => require.ensure([], () => r(require('./view/publishAsk')), 'PublishAsk');
const ChooseCatalog = r => require.ensure([], () => r(require('./view/chooseCatalog')), 'ChooseCatalog');
const UserFans = r => require.ensure([], () => r(require('./view/userFans')), 'UserFans');
const UserFollow = r => require.ensure([], () => r(require('./view/userFollow')), 'UserFollow');
const UserPoints = r => require.ensure([], () => r(require('./view/userPoints')), 'UserPoints');
const UserPublish = r => require.ensure([], () => r(require('./view/userPublish')), 'UserPublish');
const UserFansFriends = r => require.ensure([], () => r(require('./view/userFansFriends')), 'UserFansFriends');
const UserFansFriendsCenter = r => require.ensure([], () => r(require('./view/userFansFriendsCenter')), 'UserFansFriendsCenter');

const routes = [
  {
    path: '*',
    redirect: '/home'
  },
  {
    name:"login",
    component: Login,
    meta: {
      title: '会员登录',
      footerShow:false
    }
  },
    {
        name: 'ask',
        component: Ask,
        meta: {
          title: '问答',
          footerShow:true

        }
    },
  {
    name: 'home',
    component: Home,
        meta: {
          title: '精英俱乐部论坛',
          footerShow:true,
          index:0

        }
  },
  {
    name: 'user',
    component: User,
    meta: {
      title: '个人中心',
      footerShow:true
    }
  },
  {
    name: 'video',
    component: Video,
    meta: {
      title: '短视频',
      footerShow:true
    }
  },
  {
    name: 'publishArticle',
    component: PublishArticle,
    meta: {
      title: '发布文章',
      footerShow:false
    }
  },
  {
    path: '/articleDetail/:articleId',
    name: 'articleDetail',
    component: ArticleDetail,
    meta: {
      title: '文章详情',
      footerShow:false
    }
  },
  {
    name: 'publishVideo',
    component: PublishPic,
    meta: {
      title: '文章详情',
      footerShow:false
    }
  },
  {
    name: 'publishAsk',
    component: PublishAsk,
    meta: {
      title: '文章详情',
      footerShow:false
    }
  },
  {
    path: '/chooseCatalog/:articleId/:domainType',
    name: 'chooseCatalog',
    component: ChooseCatalog,
    meta: {
      title: '选择分类',
      footerShow:false
    }
  },
  {
    name: 'userFans',
    component: UserFans,
    meta: {
      title: '我的粉丝',
      footerShow:false
    }
  },
  {
    name: 'userFollow',
    component: UserFollow,
    meta: {
      title: '我的关注',
      footerShow:false
    }
  },
  {
    name: 'userPoints',
    component: UserPoints,
    meta: {
      title: '我的积分',
      footerShow:false
    }
  },
  {
    name: 'userPublish',
    component: UserPublish,
    meta: {
      title: '我的发布',
      footerShow:false
    }
  },
  {
    name: 'userFansFriends',
    component: UserFansFriends,
    meta: {
      title: '我的好友',
      footerShow:false
    }
  },
  {
    name: 'userFansFriendsCenter',
    component: UserFansFriendsCenter,
    meta: {
      title: '朋友详情',
      footerShow:false
    }
  }
];

// add route path
routes.forEach(route => {
  route.path = route.path || '/' + (route.name || '');
});

const router = new Router({ routes });

router.beforeEach((to, from, next) => {
  const title = to.meta && to.meta.title;
  if (title) {
    document.title = title;
  }

  if (to.path === '/login') {

    next();

  } else {
    let token = sessionStorage.getItem('token');
    sessionStorage.setItem("jumpTo", to.path);
    if (token == null || token == '' || token == undefined) {
      next('/login');
    } else {
      next();
    }
  }
  next();
});

export {
  router
};
