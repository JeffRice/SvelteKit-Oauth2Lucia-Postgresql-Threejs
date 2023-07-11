<script>
  import {  T, } from '@threlte/core'
  import { OrbitControls, interactivity  } from '@threlte/extras'
  import { onMount } from 'svelte'
 
// postgres data
export let authData;
console.log('auth user data from postgres', authData)

//test remote DB function
function dbRemote() {
        fetch('/api/ci', {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
              "levelsComplete": 10,
              "highScore": 100,
              "completed": false
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
  });
}


interactivity()

onMount(() => {

    var userText = document.getElementById("username-span").textContent;
    console.log('text from dom', userText)

});

</script>

<T.Mesh
scale.x={10}
scale.y={10}
scale.z={10}
on:click={dbRemote}
>

<T.BoxGeometry />
<T.MeshStandardMaterial color={'#b670e8'} />
</T.Mesh>


<T.PerspectiveCamera
    makeDefault
    position={[50, 36, 20]}
    on:create={({ ref }) => {
        ref.lookAt(0, 1, 0);
    }}
>
  <OrbitControls enableZoom />  
</T.PerspectiveCamera>

<T.DirectionalLight castShadow position={[6, 2, 4]} />