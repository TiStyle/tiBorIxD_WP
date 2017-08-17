<?php
	/*-----------------------------------------------------------------------------------*/
	/* This file will be referenced every time a template/page loads on your Wordpress site
	/* This is the place to define custom fxns and specialty code
	/*-----------------------------------------------------------------------------------*/

// Define the version so we can easily replace it throughout the theme
define( 'TIBORIXD_VERSION', 1.1 );

/*-----------------------------------------------------------------------------------*/
/*  Set the maximum allowed width for any content in the theme
/*-----------------------------------------------------------------------------------*/
if ( ! isset( $content_width ) ) $content_width = 900;

/*-----------------------------------------------------------------------------------*/
/* Add Rss feed support to Head section
/*-----------------------------------------------------------------------------------*/
add_theme_support( 'automatic-feed-links' );

/*-----------------------------------------------------------------------------------*/
/* Add Thumbnail support for posts and pages
/*-----------------------------------------------------------------------------------*/
add_theme_support( 'post-thumbnails' ); 


/*-----------------------------------------------------------------------------------*/
/* Permalinks
/*-----------------------------------------------------------------------------------*/
function reset_permalinks() {
    global $wp_rewrite;
    $wp_rewrite->set_permalink_structure( '/%postname%/' );
}
add_action( 'init', 'reset_permalinks' );


/*-----------------------------------------------------------------------------------*/
/* Register main menu for Wordpress use
/*-----------------------------------------------------------------------------------*/
register_nav_menus( 
	array(
		'primary'	=>	__( 'Primary Menu', 'tiborIxD' ), // Register the Primary menu
		// Copy and paste the line above right here if you want to make another menu, 
		// just change the 'primary' to another name
	)
);

/*-----------------------------------------------------------------------------------*/
/* Register custom logo support
/*-----------------------------------------------------------------------------------*/
function theme_prefix_setup() {
	
	add_theme_support( 'custom-logo', array(
		'height'      => 100,
		'width'       => 400,
		'flex-width' => true,
	) );

}
add_action( 'after_setup_theme', 'theme_prefix_setup' );


/*-----------------------------------------------------------------------------------*/
/* Add Thumbnail support for posts and pages
/*-----------------------------------------------------------------------------------*/
add_theme_support( 'post-thumbnails' ); 

add_image_size( 'tiborIxD-related', 150, 100, true );



/*-----------------------------------------------------------------------------------*/
/* Add plugins if they don't exsist
/*-----------------------------------------------------------------------------------*/
// Run this code on 'after_theme_setup', when plugins have already been loaded.
add_action('after_setup_theme', 'load_plugin');
// This function loads the plugin.
function load_plugin() {
	if (!class_exists('acf')) {
		// load Social if not already loaded
		// include_once(TEMPLATEPATH.'plugins/advanced-custom-fields/acf.php');
		include_once( get_stylesheet_directory() . '/plugins/advanced-custom-fields/acf.php' );
	}
}


/*-----------------------------------------------------------------------------------*/
/* Activate sidebar for Wordpress use
/*-----------------------------------------------------------------------------------*/
function naked_register_sidebars() {
	register_sidebar(array(				// Start a series of sidebars to register
		'id' => 'sidebar', 					// Make an ID
		'name' => 'Sidebar',				// Name it
		'description' => 'Take it on the side...', // Dumb description for the admin side
		'before_widget' => '<div>',	// What to display before each widget
		'after_widget' => '</div>',	// What to display following each widget
		'before_title' => '<h3 class="side-title">',	// What to display before each widget's title
		'after_title' => '</h3>',		// What to display following each widget's title
		'empty_title'=> '',					// What to display in the case of no title defined for a widget
		// Copy and paste the lines above right here if you want to make another sidebar, 
		// just change the values of id and name to another word/name
	));
} 
// adding sidebars to Wordpress (these are created in functions.php)
add_action( 'widgets_init', 'naked_register_sidebars' );

/*-----------------------------------------------------------------------------------*/
/* Enqueue Styles and Scripts
/*-----------------------------------------------------------------------------------*/

function tiborixd_scripts()  { 

    $themecsspath = get_stylesheet_directory() . '/dist/css/tiborIxD.css';
    $themejspath = get_stylesheet_directory() . '/dist/js/tiborIxD.js';

	// get the theme directory tiborIxD.css and link to it in the header
	wp_enqueue_style('tiborIxD.css', get_stylesheet_directory_uri() . '/dist/css/tiborIxD.css', array(), filemtime( $themecsspath ), false);
	
	// add swiper CSS
	wp_enqueue_style('swiper.min.css', get_stylesheet_directory_uri() . '/dist/css/swiper.min.css');

	// add swiper JS
	wp_enqueue_script( 'swiper', get_template_directory_uri() . '/dist/js/swiper.min.js' );

	// add fitvid
	wp_enqueue_script( 'tiborIxD-fitvid', get_template_directory_uri() . '/src/js/jquery.fitvids.js', array( 'jquery' ), TIBORIXD_VERSION, true );
	
	// add theme scripts
	wp_enqueue_script( 'tiborIxD', get_template_directory_uri() . '/dist/js/tiborIxD.js', array(), array(), filemtime( $themejspath ), true );



  
}
add_action( 'wp_enqueue_scripts', 'tiborixd_scripts' ); // Register this fxn and allow Wordpress to call it automatcally in the header

/*-----------------------------------------------------------------------------------*/
/* Create custom post type: PROJECTS
/*-----------------------------------------------------------------------------------*/

function project_post_type() {
 
    $labels = array(
        'name'                => _x( 'project', 'Post Type General Name', 'text_domain' ),
        'singular_name'       => _x( 'Project', 'Post Type Singular Name', 'text_domain' ),
        'menu_name'           => __( 'Projects', 'text_domain' ),
        'parent_item_colon'   => __( 'Parent Item:', 'text_domain' ),
        'all_items'           => __( 'All Items', 'text_domain' ),
        'view_item'           => __( 'View Item', 'text_domain' ),
        'add_new_item'        => __( 'Add New Item', 'text_domain' ),
        'add_new'             => __( 'Add New', 'text_domain' ),
        'edit_item'           => __( 'Edit Item', 'text_domain' ),
        'update_item'         => __( 'Update Item', 'text_domain' ),
        'search_items'        => __( 'Search Item', 'text_domain' ),
        'not_found'           => __( 'Not found', 'text_domain' ),
        'not_found_in_trash'  => __( 'Not found in Trash', 'text_domain' ),
    );
    $args = array(
        'label'               => __( 'Project', 'text_domain' ),
        'description'         => __( 'Post Type Description', 'text_domain' ),
        'labels'              => $labels,
        'supports'            => array(
                                'title',
                                'editor',
                                'excerpt',
                                'trackbacks',
                                'revisions',
                                'thumbnail',
                                'page-attributes', 
                              ),
        'taxonomies'          => array( 'category', 'post_tag' ),
        'hierarchical'        => false,
        'public'              => true,
        'show_ui'             => true,
        'show_in_menu'        => true,
        'show_in_nav_menus'   => true,
        'show_in_admin_bar'   => true,
        'menu_position'       => 5,
        'menu_icon'           => 'dashicons-format-gallery',
        'can_export'          => true,
        'has_archive'         => true,
        'exclude_from_search' => false,
        'publicly_queryable'  => true,
        'capability_type'     => 'page',
    );
    register_post_type( 'Project', $args );
}

add_action( 'init', 'project_post_type' );

/*-----------------------------------------------------------------------------------*/
/* Create custom post type: CONTACT
/*-----------------------------------------------------------------------------------*/

function contact_post_type() {
 
    $labels = array(
        'name'                => _x( 'contact', 'Post Type General Name', 'text_domain' ),
        'singular_name'       => _x( 'Contact', 'Post Type Singular Name', 'text_domain' ),
        'menu_name'           => __( 'Contact', 'text_domain' ),
        'parent_item_colon'   => __( 'Parent Item:', 'text_domain' ),
        'all_items'           => __( 'All Items', 'text_domain' ),
        'view_item'           => __( 'View Item', 'text_domain' ),
        'add_new_item'        => __( 'Add New Item', 'text_domain' ),
        'add_new'             => __( 'Add New', 'text_domain' ),
        'edit_item'           => __( 'Edit Item', 'text_domain' ),
        'update_item'         => __( 'Update Item', 'text_domain' ),
        'search_items'        => __( 'Search Item', 'text_domain' ),
        'not_found'           => __( 'Not found', 'text_domain' ),
        'not_found_in_trash'  => __( 'Not found in Trash', 'text_domain' ),
    );
    $args = array(
        'label'               => __( 'Project', 'text_domain' ),
        'description'         => __( 'Post Type Description', 'text_domain' ),
        'labels'              => $labels,
        'supports'            => array(
                                'title',
                                'editor',
                                'excerpt',
                                'trackbacks',
                                'revisions',
                                'thumbnail',
                                'page-attributes', 
                              ),
        'taxonomies'          => array( 'category', 'post_tag' ),
        'hierarchical'        => false,
        'public'              => true,
        'show_ui'             => true,
        'show_in_menu'        => true,
        'show_in_nav_menus'   => true,
        'show_in_admin_bar'   => true,
        'menu_position'       => 5,
        'menu_icon'           => 'dashicons-phone',
        'can_export'          => true,
        'has_archive'         => true,
        'exclude_from_search' => false,
        'publicly_queryable'  => true,
        'capability_type'     => 'page',
    );
    register_post_type( 'Contact', $args );
}

add_action( 'init', 'contact_post_type' );
