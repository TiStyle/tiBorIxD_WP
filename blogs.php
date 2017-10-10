<?php 
/**
 * 	Template Name: Blogs Overview
 *
*/
get_header(); // This fxn gets the header.php file and renders it ?>

<section class="">
	<div id="blogs" class="swiper-container">
		<ul id="slider" class="swiper-wrapper">
			<?php
			$recent_posts = wp_get_recent_posts(array(
				'numberposts' => -1, // Number of recent posts thumbnails to display
				'post_status' => 'publish' // Show only the published posts
			));
			foreach($recent_posts as $post) : ?>
				<li class="swiper-slide slide" style="background-image:url('<?php echo get_the_post_thumbnail_url($post['ID'], 'full'); ?>')">
					<a href="<?php echo get_permalink($post['ID']) ?>" class="blog-link">
						
						<h2><?php echo $post['post_title'] ?></h2>
						<p>
							<!--<?php echo $post['post_content'] ?>-->
							<?php
								echo wp_trim_words( $post['post_content'], 18, '...' );
							?>
						</p>
					</a>
				</li>
			<?php endforeach; wp_reset_query(); ?>
		</ul>
	</div>
</section>


<?php get_footer(); // This fxn gets the footer.php file and renders it ?>