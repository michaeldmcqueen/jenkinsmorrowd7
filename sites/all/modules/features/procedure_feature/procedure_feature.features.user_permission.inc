<?php
/**
 * @file
 * procedure_feature.features.user_permission.inc
 */

/**
 * Implements hook_user_default_permissions().
 */
function procedure_feature_user_default_permissions() {
  $permissions = array();

  // Exported permission: 'create procedures content'.
  $permissions['create procedures content'] = array(
    'name' => 'create procedures content',
    'roles' => array(),
    'module' => 'node',
  );

  // Exported permission: 'delete any procedures content'.
  $permissions['delete any procedures content'] = array(
    'name' => 'delete any procedures content',
    'roles' => array(),
    'module' => 'node',
  );

  // Exported permission: 'delete own procedures content'.
  $permissions['delete own procedures content'] = array(
    'name' => 'delete own procedures content',
    'roles' => array(),
    'module' => 'node',
  );

  // Exported permission: 'edit any procedures content'.
  $permissions['edit any procedures content'] = array(
    'name' => 'edit any procedures content',
    'roles' => array(),
    'module' => 'node',
  );

  // Exported permission: 'edit own procedures content'.
  $permissions['edit own procedures content'] = array(
    'name' => 'edit own procedures content',
    'roles' => array(),
    'module' => 'node',
  );

  return $permissions;
}
