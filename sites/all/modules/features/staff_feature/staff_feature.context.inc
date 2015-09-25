<?php
/**
 * @file
 * staff_feature.context.inc
 */

/**
 * Implements hook_context_default_contexts().
 */
function staff_feature_context_default_contexts() {
  $export = array();

  $context = new stdClass();
  $context->disabled = FALSE; /* Edit this to true to make a default context disabled initially */
  $context->api_version = 3;
  $context->name = 'about';
  $context->description = '';
  $context->tag = 'About Page';
  $context->conditions = array(
    'path' => array(
      'values' => array(
        'about-our-practice' => 'about-our-practice',
        'node/2' => 'node/2',
      ),
    ),
  );
  $context->reactions = array(
    'block' => array(
      'blocks' => array(
        'views-staff-block' => array(
          'module' => 'views',
          'delta' => 'staff-block',
          'region' => 'content',
          'weight' => '3',
        ),
      ),
    ),
  );
  $context->condition_mode = 1;

  // Translatables
  // Included for use with string extractors like potx.
  t('About Page');
  $export['about'] = $context;

  return $export;
}
