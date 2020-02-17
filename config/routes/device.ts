import { IRoute } from 'umi-types';


const r: IRoute = {
    name: 'device',
    icon: 'device',
    path: '/device',
    routes: [
        {
            name: 'in',
            icon: 'smile',
            path: '/device/in',
            component: './device/in',
        },
        {
            name: 'out',
            icon: 'smile',
            path: '/device/out',
            component: './device/settings',
        },
        {
            name: 'recycle',
            icon: 'smile',
            path: '/device/recycle',
            component: './device/recycle',
        },
        {
            name: 'rein',
            icon: 'smile',
            path: '/device/rein',
            component: './device/rein',
        },
    ],
}

export default r