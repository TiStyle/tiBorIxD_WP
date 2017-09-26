<?php 
/**
 * 	Template Name: Skills page
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
					<div class="post-meta center">
						<div class="content"><?php the_content(); ?></div>
					</div>
				</section>

				<section id="content" class="skills" role="main">
					<article id="post" class="skills">
						
						<div class="the-content">

							<?php require_once 'skills.php'; ?>

						</div>

						<div class="image" style="background-image:url('<?php the_post_thumbnail_url( 'full' ); ?> ')">
						</div>
					</article>

				</section><!-- #content .site-content -->

			<?php endwhile; // OK, let's stop the post loop once we've displayed it ?>
			
		<?php else : // Well, if there are no posts to display and loop through, let's apologize to the reader (also your 404 error) ?>
			
			<article class="post error">
				<h1 class="404">404 Nothing has been posted like that yet</h1>
			</article>

		<?php endif; // OK, I think that takes care of both scenarios (having a post or not having a post to show) ?>

	</div><!-- #primary .content-area -->
<?php get_footer(); // This fxn gets the footer.php file and renders it ?>