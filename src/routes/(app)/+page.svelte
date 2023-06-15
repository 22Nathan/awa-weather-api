

<script lang="ts">

    import { enhance } from '$app/forms'
    import type { ActionData , PageServerData } from './$types'
    import { onMount } from 'svelte'

    export let form :ActionData
    export let data :PageServerData

    // $: console.log(form)
    // $: console.log(data)
    

    let inputRef: HTMLInputElement
    
    onMount(()=>{
        inputRef.focus()

        // fetch('?/search', {
        //     // headers: { 'Content-Type': 'application/json' },
        //     method: 'POST',
        //     body: JSON.stringify({q:data.ip})
        // })
    })
    
</script>

<!--  -->

    <main>
        <a href="https://github.com/22nathan" target="_blank" class="pill"> 22Nathan </a>
        <h1>Weather API Project</h1>
        <p class="description">
            Using API from weatherapi.com
        </p>

        <form action="?/search" method="POST" use:enhance>
            <input type="text" name="q" autocomplete="off" placeholder="City" bind:this={inputRef}>
        </form>

        <div class="meta">
            <div class="info">
                <span>Location</span>
                <span class="region"> 
                    <strong>
                        { #if form }
                            {form.location.name}
                        { :else }
                            { #if data } {data.location.name} { /if }
                        { /if }
                    </strong> 
                </span>
            </div>
            <div class="info">
                <span>Current temperature</span>
                <strong>
                    { #if form }
                        {form.current.temp_c}
                    { :else } 
                        { #if data } {data.current.temp_c} { /if }
                    { /if }
                    °C / 
                    { #if form }
                        {form.current.temp_f}
                    { :else } 
                        { #if data } {data.current.temp_f} { /if } 
                    { /if }
                    °F
                </strong>
            </div>
        </div>
    </main>

    <footer>
        <div class="details">
            <p>
                Built with
                <a target="_blank" href="https://kit.svelte.dev" rel="noreferrer">Sveltekit</a>
                style from
                <a target="_blank" href="https://vercel.com" rel="noreferrer">Vercel</a>
            </p>
        </div>
    </footer>

    <!-- { #if form }
        {form.current.temp_c}
    { /if } -->

<!--  -->

<style>

    form input {
        margin-top: 5vh;
        border-radius: 5px;
        padding: 10px 20px;
        text-align: center;
    }

    @media (prefers-color-scheme: light) {
        form input {
            background: rgba(var(--bg),0.3);
            border: 1px solid rgba(0,0,0,.5);
            color: var(--fg);
        }
    }

    @media (prefers-color-scheme: dark) {
        form input {
            background: rgba(var(--fg),0.3);
            border: 1px solid rgba(255,255,255,.5);
            color: var(--fg);
        }
    }

    :global(html, body) {
        height: 100%;
        width: 100%;
        margin: 0;
        padding: 0;   
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; 
        background-size: cover;
        background-position: 50%;
        background-repeat: no-repeat;
        display: flex;
        flex-direction: column;
        /* background: var(--bg); */
        color: var(--fg);
        padding: 0 var(--root-padding);
    }

    @media (prefers-color-scheme: light) {
        :global(body) {
            --fg: #000;
            --bg: #fff;
            --remix: #2f77d1;
            --accents-1: #fafafa;
            --accents-2: #eaeaea;
            --accents-3: #999;
            --accents-4: #888;
            --accents-5: #666;
            --accents-6: #444;
            --accents-7: #333;
            --accents-8: #111;
            --nav-border: #bebebe80;
            --nav-background: #fff;
            --nav-text: #999;
            --nav-text-active: #000;
            --nav-pill: radial-gradient(#dadada 0%,#f1f1f1 100%);
            --root-padding: 16px;
            background-image: url(/bg-light.png);
            background-repeat: no-repeat;
        }
    }

    @media (prefers-color-scheme: dark) {
        :global(body) {
            --fg:#fff;
            --bg: #000;
            --accents-8: #fafafa;
            --accents-7: #eaeaea;
            --accents-6: #999;
            --accents-5: #888;
            --accents-4: #666;
            --accents-3: #444;
            --accents-2: #333;
            --accents-1: #111;
            --nav-border: #44444480;
            --nav-background: #000;
            --nav-text-active: #fff;
            --nav-pill: radial-gradient(#505050 0%,#292929 100%);
            background-image: url(/bg-dark.png);
            background-repeat: no-repeat;
        }
    }

    main {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        position: relative;
        width: 100%;
        height: 100%;
        max-width: 720px;
        margin: 0 auto;
        overflow: hidden;
    }

    a.pill {
        border-radius: 9999px;
        border: 1px solid var(--accents-2);
        background: var(--accents-2);
        font-weight: 600;
        font-size: 14px;
        color: var(--accents-7);
        text-decoration: none;
        padding: 8px 16px;
        margin-bottom: 8px;
    }

    a.pill:hover {
        filter: brightness(.96);
        transition: filter .2s ease
    }

    h1 {
        font-size: 48px;
        line-height: 1;
        text-align: center;
        color: var(--fg)
    }

    .description {
        font-size: 18px;
        color: var(--accents-5);
    }

    .meta {
        display: grid;
        grid-template-columns: repeat(2,1fr);
        align-items: center;
        justify-content: center;
        width: 100%;
        grid-gap: 0;
        gap: 0;
        margin-top: 25vh;
    }

    .info {
        flex-direction: column;
        text-align: center;
        gap: 12px
    }

    .info,.info span {
        display: flex;
        align-items: center
    }

    .info span {
        white-space: nowrap;
        width: -moz-fit-content;
        width: fit-content;
        gap: 8px;
        font-size: clamp(14px,2vw,16px);
        color: var(--accents-5)
    }

    .info span.region strong {
        color: var(--fg)
    }

    .info span svg {
        width: 18px;
        height: 18px
    }

    .info strong {
        line-height: 1.2;
        font-size: clamp(18px,5vw,40px)
    }

    footer {
        display: flex;
        justify-content: center;
        align-items: flex-end;
        position: relative;
        bottom: 0;
        left: 0;
        width: 100%;
        text-align: center;
        padding: 48px;
        box-sizing: border-box;
        font-size: 16px
    }

    footer p {
        line-height: 20px;
        color: var(--accents-7)
    }

    footer a {
        height: -moz-fit-content;
        height: fit-content
    }

    footer a:hover {
        -webkit-text-decoration: hover;
        text-decoration: hover
    }

    footer .details {
        display: flex;
        flex-direction: column;
        gap: 12px;
        font-size: inherit;
        color: var(--fg)
    }

    footer .details a {
        color: inherit;
        -webkit-text-decoration-color: var(--mono8);
        text-decoration-color: var(--mono8);
        text-decoration-thickness: 1px;
        text-underline-offset: 3px
    }

    @media (max-width: 960px) {
        footer {
            flex-direction:column;
            align-items: center;
            gap: 16px;
            padding: 16px;
            font-size: 13px
        }
    }

    @media (max-width: 600px) {
        .meta {
            gap:8px
        }
        .info {
            gap: 8px
        }
        .info span svg {
            width: 14px;
            height: 14px
        }
        footer {
            gap: 12px
        }
    }   


</style>