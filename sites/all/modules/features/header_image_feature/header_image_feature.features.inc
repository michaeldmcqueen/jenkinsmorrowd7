<?php
/**
 * @file
 * header_image_feature.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function header_image_feature_ctools_plugin_api($module = NULL, $api = NULL) {
  if ($module == "strongarm" && $api == "strongarm") {
    return array("version" => "1");
  }
}

/**
 * Implements hook_views_api().
 */
function header_image_feature_views_api($module = NULL, $api = NULL) {
  return array("api" => "3.0");
}

/**
 * Implements hook_node_info().
 */
function header_image_feature_node_info() {
  $items = array(
    'header_image' => array(
      'name' => t('Header Image'),
      'base' => 'node_content',
      'description' => t('Add Header Image to a page'),
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
  );
  drupal_alter('node_info', $items);
  return $items;
}

/**
 * Implements hook_weight_features_default_settings().
 */
function header_image_feature_weight_features_default_settings() {
  $settings = array();

  $settings['header_image'] = array(
    'enabled' => 0,
    'range' => 20,
    'menu_weight' => 0,
    'default' => 0,
    'sync_translations' => 0,
  );

  return $settings;
}
