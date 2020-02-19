import { IRoute } from 'umi-types';


const r: IRoute = {
    name: 'device',
    icon: 'book',
    path: '/device',
    routes: [
        {
            name: 'list',
            icon: 'smile',
            path: '/device/list',
            component: './device/list',
        }
    ],
}

export default r