import { IRoute } from 'umi-types';


const r: IRoute = {
    name: 'account',
    icon: 'user',
    path: '/account',
    routes: [
        {
            name: 'center',
            icon: 'smile',
            path: '/account/center',
            component: './account/center',
        },
        {
            name: 'settings',
            icon: 'smile',
            path: '/account/settings',
            component: './account/settings',
        },
    ],
}

export default r