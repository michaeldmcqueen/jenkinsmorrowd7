<?php
/**
 * @file
 * header_image_feature.features.user_permission.inc
 */

/**
 * Implements hook_user_default_permissions().
 */
function header_image_feature_user_default_permissions() {
  $permissions = array();

  // Exported permission: 'create header_image content'.
  $permissions['create header_image content'] = array(
    'name' => 'create header_image content',
    'roles' => array(),
    'module' => 'node',
  );

  // Exported permission: 'delete any header_image content'.
  $permissions['delete any header_image content'] = array(
    'name' => 'delete any header_image content',
    'roles' => array(),
    'module' => 'node',
  );

  // Exported permission: 'delete own header_image content'.
  $permissions['delete own header_image content'] = array(
    'name' => 'delete own header_image content',
    'roles' => array(),
    'module' => 'node',
  );

  // Exported permission: 'edit any header_image content'.
  $permissions['edit any header_image content'] = array(
    'name' => 'edit any header_image content',
    'roles' => array(),
    'module' => 'node',
  );

  // Exported permission: 'edit own header_image content'.
  $permissions['edit own header_image content'] = array(
    'name' => 'edit own header_image content',
    'roles' => array(),
    'module' => 'node',
  );

  return $permissions;
}
