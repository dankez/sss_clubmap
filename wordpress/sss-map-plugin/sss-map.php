<?php
/**
 * Plugin Name: SSS Map WordPress Integration
 * Plugin URI: https://sss.sk
 * Description: Tenký shortcode plugin pre integráciu SSS Map do WordPress strások.
 * Version: 1.0.0
 * Author: Slovenská Speleologická Spoločnosť
 * Text Domain: sss-map
 */

if (!defined('ABSPATH')) {
    exit; // Direct access exit
}

class SSS_Map_Plugin {
    private static $instance = null;
    private $app_url = 'http://localhost:3000'; // Alebo produkčná URL SSS Map appky

    public static function get_instance() {
        if (self::$instance == null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct() {
        add_shortcode('sss_map', array($this, 'render_map_shortcode'));
        add_shortcode('sss_group', array($this, 'render_group_shortcode'));
    }

    public function render_map_shortcode($atts) {
        $atts = shortcode_atts(array(
            'height' => '700px',
            'width' => '100%',
        ), $atts, 'sss_map');

        return sprintf(
            '<div className="sss-map-container" style="width:%s; height:%s; border-radius:16px; overflow:hidden;">
                <iframe src="%s" style="width:100%%; height:100%%; border:none;" title="SSS Map"></iframe>
            </div>',
            esc_attr($atts['width']),
            esc_attr($atts['height']),
            esc_url($this->app_url)
        );
    }

    public function render_group_shortcode($atts) {
        $atts = shortcode_atts(array(
            'id' => '',
        ), $atts, 'sss_group');

        if (empty($atts['id'])) {
            return '<p><em>[sss_group: Chýba ID skupiny]</em></p>';
        }

        $url = $this->app_url . '?group=' . urlencode($atts['id']);

        return sprintf(
            '<iframe src="%s" style="width:100%%; height:320px; border:none; border-radius:16px;" title="Speleologická skupina %s"></iframe>',
            esc_url($url),
            esc_attr($atts['id'])
        );
    }
}

add_action('plugins_loaded', array('SSS_Map_Plugin', 'get_instance'));
