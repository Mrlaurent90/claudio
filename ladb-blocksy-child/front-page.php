<?php
/**
 * Homepage template — full-width, no sidebar.
 * Blocks are placed via the Gutenberg editor on the "Accueil" static page.
 */
defined('ABSPATH') || exit;

get_header();
?>
<main id="ladb-main" class="ladb-main" role="main">
<?php
if (have_posts()) :
    while (have_posts()) :
        the_post();
        the_content();
    endwhile;
endif;
?>
</main>
<?php
get_footer();
