<script lang="ts">
    import { Canvas } from '@threlte/core'
    import Scene from './Scene.svelte'
    import type { PageData } from './$types';

    export let data: PageData;
    import { enhance } from "$app/forms";

    console.log('from routes/page.svelte', data.auth_user)

</script>

<div>
	<p>User id: {data.user.userId}</p>
	<p>Username: <span id="username-span">{data.user.username}</span></p>
</div>
<form use:enhance method="post">
	<input type="submit" value="Sign out" />
</form>

<br />

<div>extra pgresql stuff : 
    <br />
    auth_user
    {#each data.auth_user as psqlUsers}
        <li><a target="_blank" href="https://www.youtube.com/watch?v={psqlUsers.id}" rel="noreferrer">
            {psqlUsers.username}, {psqlUsers.id}
        </a></li>
    {/each}
    <br />
    data.users
    {#each data.users as psqlUsers}
        <li><a target="_blank" href="https://www.youtube.com/watch?v={psqlUsers.id}" rel="noreferrer">
            {psqlUsers.name}, {psqlUsers.email}
        </a></li>
    {/each}
    <br />
    data.aUser
    {#each data.aUser as psqlUsers}
        <li><a target="_blank" href="https://www.youtube.com/watch?v={psqlUsers.id}" rel="noreferrer">
            {psqlUsers.name}, {psqlUsers.email}
        </a></li>
    {/each}


                              </div>


<Canvas>
    <Scene authData={data.auth_user} />
</Canvas>


