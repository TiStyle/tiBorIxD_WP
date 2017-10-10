<?php 
/**
 * 	Template Name: Projects Overview
 *
*/
get_header(); // This fxn gets the header.php file and renders it ?>

	<section class="">
		<div id="projects" class="swiper-container overview">
			<ul id="slider" class="swiper-wrapper">
				<?php
				$recent_project = wp_get_recent_posts(array(
					'numberposts' => -1,
					'post_status' => 'publish',
					'post_type' => 'project',
				));
				foreach($recent_project as $project) : ?>
					<li class="swiper slide" style="background-image:url('<?php echo get_the_post_thumbnail_url($project['ID'], 'full'); ?>')">
						<div class="project-container">
							<?php if( get_field('slogan', $project['ID']) ): ?>
								<h2><?php the_field('slogan', $project['ID']); ?></h2>
							<?php endif; ?>

							<div class="project-info">
								<?php if( get_field('category', $project['ID']) ): ?>
									<p><?php the_field('category', $project['ID']); ?></p>
								<?php endif; ?>

								<?php if( get_field('customer_logo', $project['ID']) ): ?>
									<img src="<?php the_field('customer_logo', $project['ID']); ?>" alt="<?php the_field('customer', $project['ID']); ?>" width="200" />
								<?php endif; ?>
								<div class="actions">
									<a href="<?php echo get_permalink($project['ID']) ?>" class="secondary-action">See project</a>
								</div>
							</div>
						</div>
					</li>
				<?php endforeach; wp_reset_query(); ?>
			</ul>
		</div>

	</section>


<?php get_footer(); // This fxn gets the footer.php file and renders it ?>