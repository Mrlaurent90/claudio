<?php
/**
 * Template Name: Page pilier service
 * Template Post Type: page
 *
 * Pleine largeur, sans sidebar, sans titre WP natif.
 * Le H1 est porté par le bloc ladb/hero — WP ne doit pas en afficher un second.
 *
 * Comment l'activer sur une page :
 * WP Admin > Pages > (ta page) > Attributs de page > Modèle > "Page pilier service"
 * Puis dans le panneau Blocksy de la page : Content Width = Full, Page Title = Off.
 */
defined( 'ABSPATH' ) || exit;

get_header();
?>
<main
	id="ladb-pillar"
	class="ladb-pillar"
	data-pillar="<?php echo esc_attr( get_post_field( 'post_name', get_queried_object_id() ) ); ?>"
>
	<?php
	while ( have_posts() ) {
		the_post();
		the_content();
	}
	?>
</main>
<?php
get_footer();
