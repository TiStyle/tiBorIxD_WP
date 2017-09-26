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
					
					<a href="javascript:void(0)" id="conversationFormButton" class="secondary-action-light">Let's have a chat!</a>

					<p>&copy; 2014 – <?php echo date('Y'); ?> | <a href="http://ti-bor.nl" rel="theme" target="_blank">tiBor interAction deSign</a></p>
				</div>
			</div>
		<?php endforeach; wp_reset_query(); ?>
	</div>
</footer><!-- #colophon .site-footer -->

<script>
    document.addEventListener("DOMContentLoaded", function () {
        var scrollToTop = new ScrollToTop(10);
        var menu = new Menu();
		var conversation = new Conversation();


		// Intersection Observer example!!!

		function onEntry(entry) {
			entry.forEach((change) => {
				// console.log(change.isIntersecting);
				// console.log(change.intersectionRatio);
				if(change.isIntersecting) {
					change.target.classList.add('observed');
				} else{
					change.target.classList.remove('observed');
				}
			});
		}
		
		// list of options
		let options = {
			threshold: [0]
		};

		
		
		// instantiate a new Intersection Observer
		let observer = new IntersectionObserver(onEntry, options);
		
		// list of paragraphs
		let elements = document.querySelectorAll('.skills');
		
		// loop through all elements
		// pass each element to observe method
		// ES2015 for-of loop can traverse through DOM Elements
		for (let elm of elements) {
			observer.observe(elm);
		}
    });
</script>

<?php wp_footer(); 
// This fxn allows plugins to insert themselves/scripts/css/files (right here) into the footer of your website. 
// Removing this fxn call will disable all kinds of plugins. 
// Move it if you like, but keep it around.
?>

</body>
</html>
