import { IRoute } from 'umi-types';



const r: IRoute = {
    name: 'package',
    icon: 'book',
    path: '/package',
    routes: [
        {
            name: 'list',
            icon: 'smile',
            path: '/package/list',
            component: './package/list',
        }
    ],
}

export default r