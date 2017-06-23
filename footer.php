<?php
	/*-----------------------------------------------------------------------------------*/
	/* This template will be called by all other template files to finish 
	/* rendering the page and display the footer area/content
	/*-----------------------------------------------------------------------------------*/
?>

</main><!-- / end page container, begun in the header -->

<footer class="site-footer container-full scroll-point">
	<div id="contact">
		<?php
		$contact_info = wp_get_recent_posts(array(
			'numberposts' => 1,
			'post_status' => 'publish',
			'post_type' => 'contact',
		));
		foreach($contact_info as $contact) : ?>
			<div class="contact-container" style="background-image:url('<?php echo get_the_post_thumbnail_url($contact['ID'], 'full'); ?>')">
				<div class="contact-content">
					<h2><?php echo $contact['post_title'] ?></h2>
					
					<?php if( get_field('email', $contact['ID']) ): ?>
						<h4><?php the_field('email', $contact['ID']); ?></h4>
					<?php endif; ?>

					<?php if( get_field('phone', $contact['ID']) ): ?>
						<h4><?php the_field('phone', $contact['ID']); ?></h4>
					<?php endif; ?>
					
					<a href="google.nl" class="secondary-action-light">Let's have a chat!</a>

					<p>&copy; 2014 – <?php echo date('Y'); ?> Theme by: <a href="http://ti-bor.nl" rel="theme" target="_blank">tiBor</a></p>
				</div>
			</div>
		<?php endforeach; wp_reset_query(); ?>
	</div>
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
