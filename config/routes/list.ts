import { IRoute } from 'umi-types';


const r: IRoute = {
    path: '/list',
    icon: 'table',
    name: 'list',
    routes: [
        {
            path: '/list/search',
            name: 'search-list',
            component: './list/search',
            routes: [
                {
                    path: '/list/search',
                    redirect: '/list/search/articles',
                },
                {
                    name: 'articles',
                    icon: 'smile',
                    path: '/list/search/articles',
                    component: './list/search/articles',
                },
                {
                    name: 'projects',
                    icon: 'smile',
                    path: '/list/search/projects',
                    component: './list/search/projects',
                },
                {
                    name: 'applications',
                    icon: 'smile',
                    path: '/list/search/applications',
                    component: './list/search/applications',
                },
            ],
        },
        {
            name: 'table-list',
            icon: 'smile',
            path: '/list/table-list',
            component: './list/table-list',
        },
        {
            name: 'basic-list',
            icon: 'smile',
            path: '/list/basic-list',
            component: './list/basic-list',
        },
        {
            name: 'card-list',
            icon: 'smile',
            path: '/list/card-list',
            component: './list/card-list',
        },
    ],
}

export default r