

<script lang="ts">

    import type { ActionData , PageServerData } from './$types'
    import { enhance } from '$app/forms'
    import { onMount } from 'svelte'
    import { gsap } from "gsap"
    import { horizontalLoopSlider } from '$lib/utils/horizontalLoopSlider'

    export let form :ActionData
    export let data :PageServerData

    $: result = form ? form : data

    // $: console.log(result)
    // $: console.log(form)
    // $: console.log(data)
    
    let inputRef: HTMLInputElement
    
    onMount(()=>{ 
        inputRef?.focus() 
        init()
    })

    function marquee(selector: string) {
        const boxes = gsap.utils.toArray(selector)
        horizontalLoopSlider(boxes, { repeat: -1, paddingRight: 10, speed:gsap.utils.random(.1, .5), reversed:gsap.utils.random([true, false]) })
    }

    function init() {
        for (let index = 1; index < 12; index++) {
            marquee(`.marqueeItem${index}`)
        }
    }
    
</script>

<!--  -->

    <main class="">

        <div class="flex flex-col gap-2 relative select-none overflow-hidden place-items-center mx-auto">

            {#each Array.from({ length: 11 }, (_, i) => i + 1) as item}
                <div class="flex gap-2">
                    <div class="card marqueeItem{item}">
                        <p>
                            <span class="text-k">Your Location</span>
                            <span class="text-v !text-lime-500">{result.location.name}</span>
                        </p>
                        <p>
                            <span class="text-k">Current Temperature</span>
                            <span class="text-v">{result.current.temp_c + '°C'} / {result.current.temp_f + '°F'}</span>
                        </p>
                    </div>
                    <div class="card marqueeItem{item}">
                        <p>
                            <span class="text-k">Country</span>
                            <span class="text-v">{result.location.country}</span>
                        </p>
                        <p>
                            <span class="text-k">Local Time</span>
                            <span class="text-v">{result.location.localtime}</span>
                        </p>
                    </div>
                    <div class="card marqueeItem{item}">
                        <p>
                            <span class="text-k">Time Zone</span>
                            <span class="text-v">{result.location.tz_id}</span>
                        </p>
                        <p>
                            <span class="text-k">Feels</span>
                            <span class="text-v">{result.current.feelslike_c + '°C'} / {result.current.feelslike_f + '°F'}</span>
                        </p>
                    </div>
                    <div class="card marqueeItem{item}">
                        <p>
                            <img class="text-v" alt="weather-logo" src={result.current.condition.icon}/>
                        </p>
                    </div>
                    <div class="card marqueeItem{item}">
                        <p>
                            <span class="text-k">Humidity</span>
                            <span class="text-v">{result.current.humidity}</span>
                        </p>
                        <p>
                            <span class="text-k">UV</span>
                            <span class="text-v">{result.current.uv}</span>
                        </p>
                    </div>
                    <div class="card marqueeItem{item}">
                        <p>
                            <span class="text-k">Current</span>
                            <span class="text-v">{result.current.is_day ? 'Day' : 'Night'}</span>
                        </p>
                        <p>
                            <span class="text-k">Last Fetched</span>
                            <span class="text-v">{result.current.last_updated}</span>
                        </p>
                    </div>
                    <div class="card marqueeItem{item}">
                        <p>
                            <span class="text-k">Latitude</span>
                            <span class="text-v">{result.location.lat}</span>
                        </p>
                        <p>
                            <span class="text-k">longitude</span>
                            <span class="text-v">{result.location.lon}</span>
                        </p>
                    </div>
                    <div class="card marqueeItem{item}">
                        <p>
                            <span class="text-k">Precipitation</span>
                            <span class="text-v">{result.current.precip_in + ' inch'} / {result.current.precip_mm + ' mm'}</span>
                        </p>
                        <p>
                            <span class="text-k">Pressure</span>
                            <span class="text-v">{result.current.pressure_in + ' in'} / {result.current.pressure_mb + ' mb'}</span>
                        </p>
                    </div>
                    <div class="card marqueeItem{item}">
                        <p>
                            <span class="text-k">Wind Direction</span>
                            <span class="text-v">{result.current.wind_dir}</span>
                        </p>
                        <p>
                            <span class="text-k">Wind</span>
                            <span class="text-v">{result.current.wind_kph + ' kph'} / {result.current.wind_mph + ' mph'}</span>
                        </p>
                    </div>
                </div>
            {/each}

        </div>

        <form class="w-fit h-fit center" action="?/search" method="post">
            <input type="text" name="q" autocomplete="off" placeholder="City" bind:this={inputRef}>
        </form>

    </main>

<!--  -->

<style>

    .center { @apply
        absolute inset-1/2 -translate-x-1/2 -translate-y-1/2
    }

    main { @apply
        text-white relative
        w-full h-full 
        flex gap-2
    }

    form { @apply
        p-20 rounded-md bg-black/30 backdrop-blur-sm border border-white/10
    }

    form input { @apply
        rounded-md px-5 py-1 text-start border border-white/10 bg-black/30
        outline-black
    }

    .card { @apply 
        py-2 px-20 rounded-md flex flex-col h-20
        border border-white/10
        bg-[rgba(5,5,5,.5)]
        backdrop-blur will-change-transform
    }

    .card p { @apply
        w-max
    }

    .text-k, .text-v { @apply 
        text-base
    }

    .text-k { @apply
        text-[#888] font-normal
    }

    .text-v { @apply
        text-white font-thin text-lg
    }

</style>