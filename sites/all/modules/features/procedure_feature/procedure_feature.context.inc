<?php
/**
 * @file
 * procedure_feature.context.inc
 */

/**
 * Implements hook_context_default_contexts().
 */
function procedure_feature_context_default_contexts() {
  $export = array();

  $context = new stdClass();
  $context->disabled = FALSE; /* Edit this to true to make a default context disabled initially */
  $context->api_version = 3;
  $context->name = 'procedures';
  $context->description = '';
  $context->tag = 'Our Procedures';
  $context->conditions = array(
    'path' => array(
      'values' => array(
        'our-procedures' => 'our-procedures',
        'node/7' => 'node/7',
      ),
    ),
  );
  $context->reactions = array(
    'block' => array(
      'blocks' => array(
        'views-our_procedures-block' => array(
          'module' => 'views',
          'delta' => 'our_procedures-block',
          'region' => 'content',
          'weight' => '4',
        ),
      ),
    ),
  );
  $context->condition_mode = 1;

  // Translatables
  // Included for use with string extractors like potx.
  t('Our Procedures');
  $export['procedures'] = $context;

  return $export;
}
