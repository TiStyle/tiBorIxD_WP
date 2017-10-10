<?php
/**
 * The template for displaying any single post.
 *
 */

get_header(); // This fxn gets the header.php file and renders it ?>
	<div id="primary" class="row-fluid">

		<?php if ( have_posts() ) : 
		// Do we have any posts in the databse that match our query?
		?>

			<?php while ( have_posts() ) : the_post(); 
			// If we have a post to show, start a loop that will display it
			?>
				<section class="header">
					<h1 class="title center"><?php the_title(); // Display the title of the post ?></h1>
					<div class="post-meta center">
						<div class="day"><?php echo get_the_date('d'); ?></div>
						<div class="month"><?php echo get_the_date('M'); ?></div>
						<div class="year"><?php echo get_the_date('Y'); ?></div>
					</div>
				</section>

				<section id="content" class="post" role="main">
					<article id="post" class="post">
						
						<div class="the-content">
							<div id="accessibilityCheck">
								<input type="radio" name="accessibility" id="whiteBg" value="white" checked />
								<label for="whiteBg"></label>
								
								<input type="radio" name="accessibility" id="blackBg" value="black" />
								<label for="blackBg"></label>
							</div>
							<?php the_content(); 
							// This call the main content of the post, the stuff in the main text box while composing.
							// This will wrap everything in p tags
							?>
							
							<?php wp_link_pages(); // This will display pagination links, if applicable to the post ?>
							
							<div class="meta center">
								<div class="category"><?php echo get_the_category_list(); // Display the categories this post belongs to, as links ?></div>
								<div class="author"><?php echo get_the_author(); ?></div>
							</div><!-- Meta -->
						</div><!-- the-content -->
						

						<div class="image" style="background-image:url('<?php the_post_thumbnail_url( 'full' ); ?> ')">
						</div>
					</article>

					<script>
						document.addEventListener("DOMContentLoaded", function () {
							var access = new Accessibility();
						});
					</script>

				</section><!-- #content .site-content -->

				<!-- TODO:Archive link maken -->
				<a href="./blogs" class="secondary-action-light center">See All Blogs</a>

			<?php endwhile; // OK, let's stop the post loop once we've displayed it ?>
			
		<?php else : // Well, if there are no posts to display and loop through, let's apologize to the reader (also your 404 error) ?>
			
			<article class="post error">
				<h1 class="404">404 Nothing has been posted like that yet</h1>
			</article>

		<?php endif; // OK, I think that takes care of both scenarios (having a post or not having a post to show) ?>

	</div><!-- #primary .content-area -->
<?php get_footer(); // This fxn gets the footer.php file and renders it ?>
