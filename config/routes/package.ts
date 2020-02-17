import { IRoute } from 'umi-types';


const r: IRoute = {
    name: 'package',
    icon: 'book',
    path: '/package',
    routes: [
        {
            name: 'center',
            icon: 'smile',
            path: '/package/center',
            component: './package/center',
        },
        {
            name: 'settings',
            icon: 'smile',
            path: '/package/settings',
            component: './package/settings',
        },
    ],
}

export default r