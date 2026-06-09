<?php
defined( 'ABSPATH' ) || exit;
get_header();
?>
<main id="ladb-homepage">
	<?php
	while ( have_posts() ) {
		the_post();
		the_content();
	}
	?>
</main>
<?php
get_footer();
