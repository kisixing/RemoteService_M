import { IRoute } from 'umi-types';


const r: IRoute = {
    name: 'guardianshipFile',
    icon: 'book',
    path: '/guardianshipFile',
    routes: [
        {
            name: 'center',
            icon: 'smile',
            path: '/guardianshipFile/center',
            component: './guardianshipFile/center',
        },
        {
            name: 'settings',
            icon: 'smile',
            path: '/guardianshipFile/settings',
            component: './guardianshipFile/settings',
        },
    ],
}

export default r