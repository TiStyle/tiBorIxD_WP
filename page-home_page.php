<?php 
/**
 * 	Template Name: Main Homepage
 *
*/
get_header(); // This fxn gets the header.php file and renders it ?>

    <script src="wp-content/themes/tiBorIxD_WP/wwwroot/js/swiper.min.js"></script>

	<div class="container-full">
		<div class="swiper-container">
			<ul id="slider" class="swiper-wrapper">
				<?php
				$recent_posts = wp_get_recent_posts(array(
					'numberposts' => 5, // Number of recent posts thumbnails to display
					'post_status' => 'publish' // Show only the published posts
				));
				foreach($recent_posts as $post) : ?>
					<li class="swiper-slide slide" style="background-image:url('<?php echo get_the_post_thumbnail_url($post['ID'], 'full'); ?>')">
						<a href="<?php echo get_permalink($post['ID']) ?>">
							
							<h2><?php echo $post['post_title'] ?></h2>
							<p><?php echo $post['post_content'] ?></p>
						</a>
					</li>
				<?php endforeach; wp_reset_query(); ?>
			</ul>
			<div class="swiper-next"></div>
        	<div class="swiper-prev"></div>
		</div>
		<script>
			var swiper = new Swiper('.swiper-container', {
				nextButton: '.swiper-next',
				prevButton: '.swiper-prev',
				spaceBetween: 20,
				loop: true,
				keyboardControl: true,
				autoplay: 7500,
				autoplayDisableOnInteraction: false
			});
		</script>
	</div>

	<!--<div class="row">
		<div class="card col l6 m6 s12 offset-l1 offset-m1">
			What about design????
		</div>
        <div class="card col l4 m4 s12">
            About tiBor text
        </div>
	</div>
	<div id="projects" class="card row">
		<div class="item col l3 m6 s12">
			1
		</div>
		<div class="item col l3 m6 s12">
			2
		</div>
		<div class="item col l3 m6 s12">
			3
		</div>
        <div class="item col l3 m6 s12">
			4
		</div>
	</div>-->
    
<?php get_footer(); // This fxn gets the footer.php file and renders it ?>