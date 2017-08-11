<?php
/**
 * The template for displaying any single post.
 *
 */

get_header(); // This fxn gets the header.php file and renders it ?>
	<div id="primary" class="row-fluid">
	PROJECT
		<div id="main-content" role="main">

			<?php if ( have_posts() ) : 
			// Do we have any posts in the databse that match our query?
			?>

				<?php while ( have_posts() ) : the_post(); 
				// If we have a post to show, start a loop that will display it
				?>

					<article class="post">
						<h2 class="title center"><?php the_title(); ?></h2>
						<h1 class="title center"><?php the_field('slogan'); ?></h1>
						<div class="post-meta center">
							<?php the_time('m.d.Y'); // Display the time it was published ?>
							<?php // the_author(); Uncomment this and it will display the post author ?>
						
						</div><!--/post-meta -->
						
						<div class="the-content">
							<div id="accessibilityCheck">
								<input type="radio" name="accessibility" id="whiteBg" value="white" checked />
								<label for="whiteBg"></label>
								
								<input type="radio" name="accessibility" id="blackBg" value="black" />
								<label for="blackBg"></label>
							</div>

							<div id="projectPhotos" class="swiper-container">
								<ul id="slider" class="swiper-wrapper">
									<?php for ($x = 1; $x <= 5; $x++) {
                                
										$value = get_field( "slide_".$x."" );
										
										if( $value ) {
											echo '<li class="swiper-slide slide" style="background-image:url('.$value.')"></li>';
										} else {
											echo ''; 
										}
									}?>
								</ul>
								<div id="next" class="swiper-next"></div>
								<div id="prev" class="swiper-prev"></div>
							</div>

							<img src="<?php the_field('customer_logo'); ?>" class="center" alt="<?php the_title(); ?>" />

							<?php the_content(); 
							// This call the main content of the post, the stuff in the main text box while composing.
							// This will wrap everything in p tags
							?>
							
							<br>
							<?php the_field('category'); ?>
							<br>
							<?php the_field('skills'); ?>
							<br>
							<?php the_field('customer'); ?>
							<br>
							

							<?php wp_link_pages(); // This will display pagination links, if applicable to the post ?>
							
							<div class="meta center">
								<div class="category"><?php echo get_the_category_list(); // Display the categories this post belongs to, as links ?></div>
								<div class="author"><?php echo get_the_author(); ?></div>
							</div><!-- Meta -->
						</div><!-- the-content -->
						

						<div class="image" style="background-image:url('<?php the_post_thumbnail_url( 'full' ); ?> ')">
						</div>
					</article>

					<aside>
						sidebar info
					</aside>

					<script>
						document.addEventListener("DOMContentLoaded", function () {
							var access = new Accessibility();

							var swiper = new Swiper('#projectPhotos', {
								nextButton: '#next',
								prevButton: '#prev',
								spaceBetween: 20,
								loop: true,
								speed: 1500,
								parallax: true,
								keyboardControl: true,
								autoplay: 7500,
								autoplayDisableOnInteraction: false
							});
						});
					</script>

				<?php endwhile; // OK, let's stop the post loop once we've displayed it ?>
				
			<?php else : // Well, if there are no posts to display and loop through, let's apologize to the reader (also your 404 error) ?>
				
				<article class="post error">
					<h1 class="404">404 Nothing has been posted like that yet</h1>
				</article>

			<?php endif; // OK, I think that takes care of both scenarios (having a post or not having a post to show) ?>

		</div><!-- #content .site-content -->
	</div><!-- #primary .content-area -->
<?php get_footer(); // This fxn gets the footer.php file and renders it ?>
