<?php
/**
 * @file
 * site_config.features.filter.inc
 */

/**
 * Implements hook_filter_default_formats().
 */
function site_config_filter_default_formats() {
  $formats = array();

  // Exported format: Default.
  $formats['default'] = array(
    'format' => 'default',
    'name' => 'Default',
    'cache' => 1,
    'status' => 1,
    'weight' => 0,
    'filters' => array(
      'invisimail_encode_html_entities' => array(
        'weight' => 0,
        'status' => 1,
        'settings' => array(
          'encoder' => 'html_entities',
          'chunk' => 0,
          'link' => 0,
        ),
      ),
      'invisimail_encode_js_entities' => array(
        'weight' => 0,
        'status' => 1,
        'settings' => array(
          'encoder' => 'js_entities',
          'chunk' => 0,
          'link' => 1,
        ),
      ),
      'picture' => array(
        'weight' => 0,
        'status' => 1,
        'settings' => array(),
      ),
    ),
  );

  // Exported format: Display Suite code.
  $formats['ds_code'] = array(
    'format' => 'ds_code',
    'name' => 'Display Suite code',
    'cache' => 0,
    'status' => 1,
    'weight' => 12,
    'filters' => array(
      'ds_code' => array(
        'weight' => 0,
        'status' => 1,
        'settings' => array(),
      ),
    ),
  );

  // Exported format: Plain text.
  $formats['plain_text'] = array(
    'format' => 'plain_text',
    'name' => 'Plain text',
    'cache' => 1,
    'status' => 1,
    'weight' => 10,
    'filters' => array(
      'filter_html_escape' => array(
        'weight' => 0,
        'status' => 1,
        'settings' => array(),
      ),
      'filter_url' => array(
        'weight' => 1,
        'status' => 1,
        'settings' => array(
          'filter_url_length' => 72,
        ),
      ),
      'filter_autop' => array(
        'weight' => 2,
        'status' => 1,
        'settings' => array(),
      ),
    ),
  );

  return $formats;
}
