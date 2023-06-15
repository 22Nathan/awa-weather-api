

import type { Config } from '@sveltejs/adapter-vercel'


import type { PageServerLoad, Actions } from './$types'

import { WEATHERAPIKEY } from '$env/static/private'

export const config: Config = {
    runtime: 'edge'
};


const apiErrorsStatus = [ 400 , 401 , 403 ]


export const load = ( async () => {

    // const searchIp = await fetch('https://api.ipify.org?format=json')
    // const resIp = await searchIp.json()
    // const url= `http://api.weatherapi.com/v1/current.json?key=${WEATHERAPIKEY}&q=${resIp.ip}`
    const url= `http://api.weatherapi.com/v1/current.json?key=${WEATHERAPIKEY}&q=auto:ip`
    const res = await fetch( url , { method: 'POST' } )
    return await res.json()


}) satisfies PageServerLoad;



export const actions = {

    search: async (event) => {
        const data = await event.request.formData()
        const url= `http://api.weatherapi.com/v1/current.json?key=${WEATHERAPIKEY}&q=${data.get('q')}`
        const res = await fetch( url , { method: 'POST' } )
        // console.log(res.status);

        if (apiErrorsStatus.includes( res.status )) {
            return { 
                location:{ 
                    name:'?' 
                }, 
                current:{ 
                    temp_c:'?', 
                    temp_f:'?' 
                } 
            }
        }
        
        return await res.json()
    }

} satisfies Actions;