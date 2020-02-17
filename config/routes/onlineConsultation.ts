import { IRoute } from 'umi-types';


const r: IRoute = {
    name: 'onlineConsultation',
    icon: 'book',
    path: '/onlineConsultation',
    routes: [
        {
            name: 'center',
            icon: 'smile',
            path: '/onlineConsultation/center',
            component: './onlineConsultation/center',
        },
        {
            name: 'settings',
            icon: 'smile',
            path: '/onlineConsultation/settings',
            component: './onlineConsultation/settings',
        },
    ],
}

export default r