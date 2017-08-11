<?php
	/*-----------------------------------------------------------------------------------*/
	/* This template will be called by all other template files to begin 
	/* rendering the page and display the header/nav
	/*-----------------------------------------------------------------------------------*/
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>" />
<meta name="viewport" content="width=device-width" />
<title>
	<?php bloginfo('name'); // show the blog name, from settings ?> | 
	<?php is_front_page() ? bloginfo('description') : wp_title(''); // if we're on the home page, show the description, from the site's settings - otherwise, show the title of the post or page ?>
</title>


<link rel="profile" href="http://gmpg.org/xfn/11" />
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />
<script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=String.prototype.endsWith,String.prototype.startsWith,Element.prototype.prepend,Element.prototype.append,Array.from,Array.prototype.find,Element.prototype.remove,Promise,fetch,HTMLPictureElement"></script>

<?php // Loads HTML5 JavaScript file to add support for HTML5 elements in older IE versions. ?>
<!--[if lt IE 9]>
<script src="<?php echo get_template_directory_uri(); ?>/js/html5.js" type="text/javascript"></script>
<![endif]-->

<?php wp_head(); 
// This fxn allows plugins, and Wordpress itself, to insert themselves/scripts/css/files
// (right here) into the head of your website. 
// Removing this fxn call will disable all kinds of plugins and Wordpress default insertions. 
// Move it if you like, but I would keep it around.
?>

</head>

<body 
	<?php body_class(); 
	// This will display a class specific to whatever is being loaded by Wordpress
	// i.e. on a home page, it will return [class="home"]
	// on a single post, it will return [class="single postid-{ID}"]
	// and the list goes on. Look it up if you want more.
	?>
>

<header>
	<nav id="menu">

		<div id="brand" class="center">
			<h1 class="site-title hide">
				<a href="<?php echo esc_url( home_url( '/' ) ); // Link to the home page ?>" title="<?php echo esc_attr( get_bloginfo( 'name', 'display' ) ); // Title it with the blog name ?>" rel="home"><?php bloginfo( 'name' ); // Display the blog name ?></a>
			</h1>
			<h4 class="site-description hide">
				<?php bloginfo( 'description' ); // Display the blog description, found in General Settings ?>
			</h4>
			<!--<img src="<?php $custom_logo_id = get_theme_mod( 'custom_logo' ); $image = wp_get_attachment_image_src( $custom_logo_id , 'full' ); echo $image[0]; ?>" class="site-logo" alt="<?php echo esc_attr( get_bloginfo( 'name', 'display' ) ); ?> - <?php bloginfo( 'description' ); ?>" />-->
			<a href="<?php echo esc_url( home_url( '/' ) ); ?>" title="Go to home">
				<div class="site-logo" title="<?php echo esc_attr( get_bloginfo( 'name', 'display' ) ); ?> - <?php bloginfo( 'description' ); ?>" style="background-image:url('<?php $custom_logo_id = get_theme_mod( 'custom_logo' ); $image = wp_get_attachment_image_src( $custom_logo_id , 'full' ); echo $image[0]; ?>');"></div>
			</a>
		</div><!-- /brand -->

		<?php wp_nav_menu( array( 'theme_location' => 'primary' ) ); // Display the user-defined menu in Appearance > Menus ?>

		<?php
		$recent_posts = wp_get_recent_posts(array(
			'numberposts' => 1, // Number of recent posts thumbnails to display
			'post_status' => 'publish' // Show only the published posts
		));
		foreach($recent_posts as $post) : ?>
			<a id="latestBlog" href="<?php echo get_permalink($post['ID']) ?>" title="<?php echo $post['post_title'] ?>">
				<span class="tag">Latest Blog</span>
				<h2><?php echo $post['post_title'] ?></h2>
			</a>
		<?php endforeach; wp_reset_query(); ?>

		<script>
			document.addEventListener('DOMContentLoaded', function(){
				var latestBlog = document.getElementById('latestBlog')
				document.querySelector('.menu-primary-container').append(latestBlog);
			});
		</script>
		
	</nav><!-- .site-navigation .main-navigation -->
    
</header><!-- #masthead .site-header -->

<main class="main-container"><!-- start the page containter -->
