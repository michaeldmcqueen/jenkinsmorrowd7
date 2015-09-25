<?php
/**
 * @file
 * static_page.context.inc
 */

/**
 * Implements hook_context_default_contexts().
 */
function static_page_context_default_contexts() {
  $export = array();

  $context = new stdClass();
  $context->disabled = FALSE; /* Edit this to true to make a default context disabled initially */
  $context->api_version = 3;
  $context->name = 'static_page';
  $context->description = '';
  $context->tag = 'Static Page';
  $context->conditions = array(
    'node' => array(
      'values' => array(
        'static_page' => 'static_page',
      ),
      'options' => array(
        'node_form' => '0',
      ),
    ),
  );
  $context->reactions = array(
    'block' => array(
      'blocks' => array(
        'views-gallery-block' => array(
          'module' => 'views',
          'delta' => 'gallery-block',
          'region' => 'content',
          'weight' => '10',
        ),
      ),
    ),
  );
  $context->condition_mode = 1;

  // Translatables
  // Included for use with string extractors like potx.
  t('Static Page');
  $export['static_page'] = $context;

  return $export;
}
