import { IRoute } from 'umi-types';


const r: IRoute = {
    path: '/form',
    icon: 'form',
    name: 'form',
    routes: [
        {
            name: 'basic-form',
            icon: 'smile',
            path: '/form/basic-form',
            component: './form/basic-form',
        },
        {
            name: 'step-form',
            icon: 'smile',
            path: '/form/step-form',
            component: './form/step-form',
        },
        {
            name: 'advanced-form',
            icon: 'smile',
            path: '/form/advanced-form',
            component: './form/advanced-form',
        },
    ],
}

export default r