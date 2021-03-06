<?php 
/**
 * 	Template Name: Main Homepage
 *
*/
get_header(); // This fxn gets the header.php file and renders it ?>

    <script src="wp-content/themes/tiBorIxD_WP/dist/js/swiper.min.js"></script>

	<section class="container-full scroll-point">
		<div id="blogs" class="swiper-container">
			<ul id="slider" class="swiper-wrapper">
				<?php
				$recent_posts = wp_get_recent_posts(array(
					'numberposts' => 5, // Number of recent posts thumbnails to display
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
			<div id="blogNext" class="swiper-next"></div>
        	<div id="blogPrev" class="swiper-prev"></div>
		</div>
		<script>
			var swiper = new Swiper('#blogs', {
				nextButton: '#blogNext',
				prevButton: '#blogPrev',
				spaceBetween: 20,
				loop: true,
				speed: 1500,
				parallax: true,
				keyboardControl: true,
				autoplay: 7500,
				autoplayDisableOnInteraction: false
			});
		</script>
	</section>

	<section class="container-full scroll-point">
		<div id="projects" class="swiper-container">
			<ul id="slider" class="swiper-wrapper">
				<?php
				$recent_project = wp_get_recent_posts(array(
					'numberposts' => 5,
					'post_status' => 'publish',
					'post_type' => 'project',
				));
				foreach($recent_project as $project) : ?>
					<li class="swiper-slide slide" style="background-image:url('<?php echo get_the_post_thumbnail_url($project['ID'], 'full'); ?>')">
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
									<!-- ToDo: link to all projects -->
									<a href="projects" class="secondary-action">See all projects</a>
								</div>
							</div>
						</div>
					</li>
				<?php endforeach; wp_reset_query(); ?>
			</ul>
			<div id="projNext" class="swiper-next"></div>
        	<div id="projPrev" class="swiper-prev"></div>
		</div>
		<script>
			var swiper = new Swiper('#projects', {
				nextButton: '#projNext',
				prevButton: '#projPrev',
				spaceBetween: 20,
				slidesPerView: 'auto',
				loop: true,
				speed: 800,
				parallax: true,
				keyboardControl: true,
			});
		</script>
	</section>

	<section class="container-full scroll-point skills">
		
		<?php
			$skills = wp_get_recent_posts(array(
				'numberposts' => 1,
				'post_status' => 'publish',
				'post_type' => 'page',
				'type' => 'skills',
			));
			foreach($skills as $skill) : ?>

				<div class="container-full" style="background-image:url('<?php echo get_the_post_thumbnail_url($skill['ID'], 'tiborIxD-cover'); ?>')">
					<div class="content">
						<article>
							<p class="center"><?php echo $skill['post_content'] ?></p>

							<?php
								/*
								* Show a max of 6 skills
								*/
								$max_skill_amount = 6; require_once 'skills.php'; 
							?>

						</article>
						<div class="actions">
							<!-- ToDo: link to all skills -->
							<a href="skills" class="secondary-action-light center">See all my skills</a>
						</div>
					</div>					
				</div>
			
			<?php endforeach; wp_reset_query(); ?>
		
	</section>

    <script>
		document.addEventListener("DOMContentLoaded", function () {
			var x = new ScrollToNext();
		});
	</script>	
<?php get_footer(); // This fxn gets the footer.php file and renders it ?>