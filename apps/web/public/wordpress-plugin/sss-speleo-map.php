<?php
/**
 * Plugin Name: SSS Speleo Map Embed
 * Plugin URI: https://sss.sk
 * Description: Interaktívne 3D mapy krasových oblastí a jaskyniarskych skupín Slovenskej Speleologickej Spoločnosti pre WordPress (WebSupport Hosting).
 * Version: 1.0.0
 * Author: Slovenská Speleologická Spoločnosť
 * Author URI: https://sss.sk
 * License: GPLv2 or later
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

function sss_speleo_map_shortcode_handler($atts) {
    $atts = shortcode_atts(array(
        'group' => '',
        'area' => '',
        'layer' => 'opentopomap',
        'theme' => 'slate-clean',
        'polygons' => 'true',
        'pois' => 'true',
        'is3d' => 'false',
        'height' => '520px',
        'width' => '100%',
        'src' => ''
    ), $atts, 'sss_speleo_map');

    // Base URL of the hosted SSS Map application (adjust URL to your hosted domain/subfolder)
    $base_url = !empty($atts['src']) ? $atts['src'] : 'http://localhost:3001/';

    $query_args = array(
        'embed' => 'true'
    );

    if (!empty($atts['group'])) $query_args['group'] = $atts['group'];
    if (!empty($atts['area'])) $query_args['area'] = $atts['area'];
    if (!empty($atts['layer'])) $query_args['layer'] = $atts['layer'];
    if (!empty($atts['theme'])) $query_args['theme'] = $atts['theme'];
    if ($atts['polygons'] === 'false') $query_args['polygons'] = 'false';
    if ($atts['pois'] === 'false') $query_args['pois'] = 'false';
    if ($atts['is3d'] === 'true') $query_args['is3d'] = 'true';

    $iframe_src = add_query_arg($query_args, $base_url);

    $html = '<div className="sss-speleo-map-container" style="width:100%;margin:1.5rem 0;">';
    $html .= '<iframe src="' . esc_url($iframe_src) . '" ';
    $html .= 'style="width:' . esc_attr($atts['width']) . ';height:' . esc_attr($atts['height']) . ';border:none;border-radius:12px;box-shadow:0 8px 24px rgba(0,0,0,0.15);" ';
    $html .= 'allow="geolocation; fullscreen" allowfullscreen></iframe>';
    $html .= '</div>';

    return $html;
}

add_shortcode('sss_speleo_map', 'sss_speleo_map_shortcode_handler');
