<?php
/**
 * Plugin Name: eventbird — CGB Gutenberg Block Plugin
 * Plugin URI: https://github.com/ahmadawais/create-guten-block/
 * Description: eventbird — is a Gutenberg plugin created via create-guten-block.
 * Author: mrahmadawais, maedahbatool
 * Author URI: https://AhmadAwais.com/
 * Version: 1.0.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';


/**
 * Post Type
 */
function eventbird_create_post_type() {
	register_post_type('event', array(
		'supports' => array('editor', 'custom-fields'),
		'labels' => array(
			'name'          => __('Events'),
			'singular_name' => __('Event'),
			'add_new'       => _x('Add New', 'event'),
			'add_new_item'  => __('Add New Event')
		),
		'public' => true,
		'publicly_queryable' => true,
		'has_archive' => true,
		'menu_postition' => 20,
		'menu_icon' => 'dashicons-calendar-alt',
		'show_in_rest' => true,
		'template' => array(
			array('eventbird/event', array())
		)
		//'template_lock' => 'all'
	));

	register_post_meta('event', 'eventbird_start_date', array(
		'type' => 'string',
		'single' => true,
		'show_in_rest' => true
	));
}

add_action('init', 'eventbird_create_post_type');