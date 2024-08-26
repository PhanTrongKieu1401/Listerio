import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home/index.vue';
import Author from '../views/Author/index.vue';
import Mainpage from '../views/Mainpage/index.vue';

import Login from '../components/auth/Login/index.vue';
import Register from '../components/auth/regis/Register/index.vue';
import RedirectLogin from '../components/auth/redirectLogin/index.vue';
import Valid from '../components/auth/regis/Valid/index.vue';
import Regisform from '../components/auth/regis/Regisform/index.vue';
import Forgot from '../components/auth/forgotPassword/Forgot/index.vue';
import ValidForgot from '../components/auth/forgotPassword/ValidForgot/index.vue';
import ForgotForm from '../components/auth/forgotPassword/ForgotForm/index.vue';


import AllProject from '../views/AllProject/index.vue';
import Project from '../views/Project/index.vue';
import Board from '../components/board/index.vue';
import ProjectAccess from '../components/project/projectsetings/ProjectAccess/index.vue';
import ProjectDetail from '../components/project/projectsetings/ProjectDetail/index.vue';
import Backlog from '../components/backlog/index.vue';
import CreateProject from '../components/project/CreateProject/index.vue'
import Task from '../components/taskDetail/index.vue';
import Profile from '../views/Profile/index.vue';
import Filter from '../views/Filter/index.vue';


import WaitPage from '../views/waitPage/index.vue';
import WaitSharePage from '../views/waitSharePage/index.vue';

import Bug from '../components/issueType/bug/index.vue';
import TaskIssue from '../components/issueType/task/index.vue';
import StoryIssue from '../components/issueType/stori/index.vue';
import IssueType from '../views/IssueType/index.vue';

import { useAuthStore } from '../stores/authStores/authStore';
import { useRegisAccountStore, useValidateOtpRegisStore} from '../stores/authStores/regisStore';
import { useForgotPasswordStore, useValidateOtpStore } from '../stores/authStores/forgotStore';
const routes = [
  {
    path: '/',  
    component: Home,
    beforeEnter: (to, from, next) => {
      const authStore = useAuthStore();
      if (authStore.isLoggedIn()) {
        next({ path: '/allproject' });
      } else {
        next();
      }
    },
  },
  {
    path: '/author',
    component: Author,
    beforeEnter: (to, from, next) => {
      const authStore = useAuthStore();
      if (authStore.isLoggedIn()) {
        next({ path: '/allproject' });
      } else {
        next();
      }
    },
    children: [
      {
        path: '',
        name: 'login',
        component: Login,
      },
      {
        path: 'register',
        name: 'register',
        component: Register,
      },
      {
        path: 'validate',
        name: 'validate',
        component: Valid,
        beforeEnter: (to, from, next) => {
          const regisAccountStore = useRegisAccountStore();
          if (!regisAccountStore.email) {
            next({ name: 'register' });
          } else {
            next();
          }
        },
      },
      {
        path: 'regisform',
        name: 'regisform',
        component: Regisform,
        // beforeEnter: (to, from, next) => {
        //   const validateStoreRegis = useValidateOtpRegisStore();
        //   if (!validateStoreRegis.registerKey) {
        //     next({ name: 'validate' });
        //   } else {
        //     next();
        //   }
        // },
      },
      {
        path: 'forgot',
        name: 'forgot',
        component: Forgot,
        
      },
      {
        path: 'validforgot',
        name: 'validforgot',
        component: ValidForgot,
        beforeEnter: (to, from, next) => {
          const forgotPasswordStore = useForgotPasswordStore();
          if (!forgotPasswordStore.email) {
            next({ name: 'forgot' });
          } else {
            next();
          }
        },
      },
      {
        path: 'forgotform',
        name: 'forgotform',
        // beforeEnter: (to, from, next) => {
        //   const validateStoreForgot = useValidateOtpStore();
        //   if (!validateStoreForgot.resetPasswordKey) {
        //     next({ name: 'validforgot' });
        //   } else {
        //     next();
        //   }
        // },
        component: ForgotForm,
      },
      {
        path: 'redirect-login',
        name: 'redirect-login',
        component: RedirectLogin,
      },
    ],
  },
  {
    path: '/mainpage',
    component: Mainpage,
    children: [
      {
        path: '/allproject',
        component: AllProject,  
      },
      {
        path: '/profile',
        component: Profile, 
      },
      
      {
        path: '/share',  
        component: WaitSharePage,
      },
      {
        path: '',
        component: Project,
        children: [
          {
            path: '',
            component: Board,
          },
          {
            path: '/projects/settings/access',
            component: ProjectAccess,
          },
          {
            path: '/projects/settings/detail',
            component: ProjectDetail,
            
          },

          {
            path: 'backlog',
            component: Backlog,
          },
          {
            path :"/task",
            component: Task,
          },
          
          
        ]
      },
      {
        path: '/project-create',
        component: CreateProject,
      },
      {
        path :"/issues",
        component: Filter,
      },
      
    ],
    meta: { requiresAuth: true },
  },
  
  {
    path: '/:pathMatch(.*)*', 
    redirect: '/',
  },
  {
    path: '/issueType',
    component: IssueType,
    children: [
      {
        path: 'bug',
        component: Bug,
      },
      {
        path: 'task',
        component: TaskIssue,
      },
      {
        path: 'story',
        component: StoryIssue,
      }
    ],
    // meta: { requiresAuth: true },
  },
  {
    path: '/wait',  
    component: WaitPage,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.matched.some(record => record.meta.requiresAuth) && !authStore.isLoggedIn()) {
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router;