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

							<!-- SKILLS QUERY HERE -->
							<?php
								$skills = wp_get_recent_posts(array(
									'numberposts' => -1,
									'post_status' => 'publish',
									'orderby' => 'menu_order',
									'order' => 'ASC',
									'post_type' => 'skill',
								));
								foreach($skills as $skill) : ?>

								<div class="skill">
									<div class="skill-icon">
										<?php
											if( get_field('skill_icon', $skill['ID'])) :
												echo the_field('skill_icon', $skill['ID']);
											endif;
										?>
									</div>
									
									<div class="skill-bar">
										<?php 
											if( get_field('skill_value', $skill['ID']) ) :
											$skill_value = get_field('skill_value', $skill['ID']);
											// echo str_repeat('<div class="value" data-id="'.$skill['ID'].'"></div>', $skill_value);
											echo str_repeat('<div class="value"></div>', $skill_value);
										
											endif; 
										?>
									</div>

									<div class="skill-meta">
										<h3><?php echo $skill['post_title']; ?></h3>
										
										<hr>

										<div class="skill-info">
											<?php echo $skill['post_content']; ?>
										</div>
									</div>
								</div>
								
								<?php endforeach; wp_reset_query(); ?>
							<!-- SKILLS QUERY END -->

						</div>

						<div class="image" style="background-image:url('<?php the_post_thumbnail_url( 'full' ); ?> ')">
						</div>
					</article>

					<script>
						document.addEventListener("DOMContentLoaded", function () {
							var skillsBar = Array.from(document.querySelectorAll('.skill-bar'));
							skillsBar.forEach(skillbar => i = new Skill(skillbar));
							// var skill = new Skill();
						});
					</script>

				</section><!-- #content .site-content -->

			<?php endwhile; // OK, let's stop the post loop once we've displayed it ?>
			
		<?php else : // Well, if there are no posts to display and loop through, let's apologize to the reader (also your 404 error) ?>
			
			<article class="post error">
				<h1 class="404">404 Nothing has been posted like that yet</h1>
			</article>

		<?php endif; // OK, I think that takes care of both scenarios (having a post or not having a post to show) ?>

	</div><!-- #primary .content-area -->
<?php get_footer(); // This fxn gets the footer.php file and renders it ?>