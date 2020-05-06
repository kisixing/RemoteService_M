import { IRoute } from 'umi-types';


const r: IRoute = {
    name: 'device',
    icon: 'printer',
    path: '/device',
    routes: [
        {
            name: 'list',
            icon: 'ordered-list',
            path: '/device/list',
            component: './device',
        }
    ],
}

export default r