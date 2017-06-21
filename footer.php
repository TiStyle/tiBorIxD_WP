<?php
	/*-----------------------------------------------------------------------------------*/
	/* This template will be called by all other template files to finish 
	/* rendering the page and display the footer area/content
	/*-----------------------------------------------------------------------------------*/
?>

</main><!-- / end page container, begun in the header -->

<footer class="site-footer scroll-point">
	<div class="site-info container">
		
		<p>
			Theme by: <a href="http://ti-bor.nl" rel="theme" target="_blank">tiBor</a>
		</p>
		
	</div><!-- .site-info -->
</footer><!-- #colophon .site-footer -->

<script>
    document.addEventListener("DOMContentLoaded", function () {
        var a = new ScrollToTop(10);
        var b = new Menu();
    });
</script>

<?php wp_footer(); 
// This fxn allows plugins to insert themselves/scripts/css/files (right here) into the footer of your website. 
// Removing this fxn call will disable all kinds of plugins. 
// Move it if you like, but keep it around.
?>

</body>
</html>
