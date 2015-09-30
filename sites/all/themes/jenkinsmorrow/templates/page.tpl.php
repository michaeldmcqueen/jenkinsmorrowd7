<header role="banner" class="site-header">
  <div class="wrap">
    <!-- Logo -->
    <a href="/">
    <picture class="logo">
      <source type="image/svg+xml" srcset="<?php print $GLOBALS['base_url'] . '/' . drupal_get_path('theme', 'jenkinsmorrow'); ?>/assets/images/logos/logo.svg">
      <img src="<?php print $GLOBALS['base_url'] . '/' . drupal_get_path('theme', 'jenkinsmorrow'); ?>/assets/images/logos/logo.png" alt="Jenkins & Morrow">
    </picture>
  </a>
  <!-- Main Navigation -->
  <?php if ($page['main_nav']): ?>
    <nav role="navigation" class="main-navigation">
      <?php print render($page['main_nav']); ?>
    </nav>
  <?php endif; ?>
  </div>
</header>
<!-- Close Header -->

<?php if ($page['preface']): ?>
  <div class="preface cleafix">
    <picture class="preface-bar">
      <source type="image/svg+xml" srcset="<?php print $GLOBALS['base_url'] . '/' . drupal_get_path('theme', 'jenkinsmorrow'); ?>/assets/images/preface-bar.svg">
      <img src="<?php print $GLOBALS['base_url'] . '/' . drupal_get_path('theme', 'jenkinsmorrow'); ?>/assets/images/preface-bar.png" alt="Jenkins & Morrow">
    </picture>
      <?php print render($page['preface']); ?>
  </div>
<?php endif; ?>
<!-- Close Preface -->
<main role="main" id="content">
  <div class="wrap">
    <?php if ($page['help']): ?>
        <?php print render($page['help']); ?>
    <?php endif; ?>

    <?php if ($page['sidebar_first']): ?>
      <aside class="sidebar-call" role="banner">
        <?php print render($page['sidebar_first']); ?>
      </aside>
    <?php endif; ?>
    
    <?php if ($page['content']): ?>
        <?php print render($page['content']); ?>
    <?php endif; ?>

    <?php if ($page['sidebar_second']): ?>
      <aside class="sidebar-second" role="complementary">
        <?php print render($page['sidebar_second']); ?>
      </aside>
    <?php endif; ?>
  </div>
</main>

<?php if ($page['postscript']): ?>
  <div class="postscript wrap">
    <?php print render($page['postscript']); ?>
  </div>
<?php endif; ?>

<footer>
    <div class="wrap">
      <h6>Jenkins and Morrow</h6>
      <p>216 Fountain Ct., Suite 110, Lexington, KY 40509  •  859-264-1898</p>
      <p>200 City Hill Dr, #102, London, KY 40741  •  606-877-8811</p>
    </div>
</footer>