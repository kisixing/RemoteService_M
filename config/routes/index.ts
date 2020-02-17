import { IRoute } from 'umi-types';
import account from "./account";
import dashboard from "./dashboard";
import form from "./form";
import list from "./list";
import profile from "./profile";
import result from "./result";
import editor from "./editor";
import exception from "./exception";
import device from "./device";




export const routes: IRoute[] = [
    {
        path: '/',
        component: '../layouts/BlankLayout',
        routes: [
            {
                path: '/user',
                component: '../layouts/UserLayout',
                routes: [
                    {
                        path: '/user',
                        redirect: '/user/login',
                    },
                    {
                        name: 'login',
                        icon: 'smile',
                        path: '/user/login',
                        component: './user/login',
                    },
                    {
                        name: 'register-result',
                        icon: 'smile',
                        path: '/user/register-result',
                        component: './user/register-result',
                    },
                    {
                        name: 'register',
                        icon: 'smile',
                        path: '/user/register',
                        component: './user/register',
                    },
                    {
                        component: '404',
                    },
                ],
            },
            {
                path: '/',
                component: '../layouts/BasicLayout',
                Routes: ['src/pages/Authorized'],
                authority: ['admin', 'user'],
                routes: [
                    device,
                    dashboard,
                    form,
                    list,
                    profile,
                    result,
                    account,
                    editor,
                    exception,
                    {
                        path: '/',
                        redirect: '/dashboard/workplace',
                        authority: ['admin', 'user'],
                    },
                    {
                        component: '404',
                    },
                ],
            },
        ],
    },
] 
