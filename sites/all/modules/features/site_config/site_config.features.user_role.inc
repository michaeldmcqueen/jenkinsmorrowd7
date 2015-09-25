<?php
/**
 * @file
 * site_config.features.user_role.inc
 */

/**
 * Implements hook_user_default_roles().
 */
function site_config_user_default_roles() {
  $roles = array();

  // Exported role: admin.
  $roles['admin'] = array(
    'name' => 'admin',
    'weight' => 2,
  );

  // Exported role: manager.
  $roles['manager'] = array(
    'name' => 'manager',
    'weight' => 3,
  );

  return $roles;
}
