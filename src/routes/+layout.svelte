<script lang="ts">
	import '../app.css'
	import './styles.css'
</script>

<div class="app">
	<main>


  <div id="tester"></div>

    
		<slot />
	</main>
</div>

<style>
  main {
	min-height: 95vh;
    min-width: 95vw;
    margin: 0;
    background-attachment: fixed;
  }

  .app{
	display: flex;
    align-items: center;
    justify-content: center;
  }

</style>
