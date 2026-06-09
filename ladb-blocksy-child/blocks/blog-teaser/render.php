<?php
defined( 'ABSPATH' ) || exit;

$eyebrow       = $attributes['eyebrow']      ?? '';
$heading       = $attributes['heading']      ?? '';
$description   = $attributes['description'] ?? '';
$view_all_text = $attributes['viewAllText']  ?? 'Voir tous les articles';
$view_all_url  = $attributes['viewAllUrl']   ?? '';
$category_slug = $attributes['categorySlug'] ?? '';
$posts_count   = intval( $attributes['postsCount'] ?? 4 );

$args = [
	'post_type'      => 'post',
	'post_status'    => 'publish',
	'posts_per_page' => $posts_count,
	'orderby'        => 'date',
	'order'          => 'DESC',
];
if ( $category_slug ) {
	$args['category_name'] = sanitize_text_field( $category_slug );
}
$posts = get_posts( $args );

// Fallback si pas assez d'articles
if ( empty( $posts ) ) {
	echo '<div class="ladb-blog-teaser ladb-blog-teaser--empty"><p>Aucun article pour l\'instant.</p></div>';
	return;
}
?>
<section class="ladb-blog-teaser wp-block-ladb-blog-teaser">
  <div class="ladb-blog-teaser__header ladb-container">
    <?php if ( $eyebrow ) : ?><span class="ladb-eyebrow"><?= esc_html( $eyebrow ) ?></span><?php endif; ?>
    <?php if ( $heading ) : ?><h2 class="ladb-blog-teaser__heading"><?= esc_html( $heading ) ?></h2><?php endif; ?>
    <?php if ( $description ) : ?><p class="ladb-blog-teaser__desc"><?= esc_html( $description ) ?></p><?php endif; ?>
  </div>
  <div class="ladb-blog-teaser__grid ladb-container">
    <?php foreach ( $posts as $post ) :
      $thumb    = get_the_post_thumbnail_url( $post->ID, 'medium_large' ) ?: '';
      $cats     = get_the_category( $post->ID );
      $cat_name = $cats ? esc_html( $cats[0]->name ) : '';
      $date     = get_the_date( 'd M. Y', $post->ID );
      $content  = get_post_field( 'post_content', $post->ID );
      $words    = str_word_count( strip_tags( $content ) );
      $read_time = max( 1, round( $words / 200 ) );
    ?>
    <article class="ladb-blog-teaser__card">
      <a href="<?= esc_url( get_permalink( $post->ID ) ) ?>" class="ladb-blog-teaser__card-link" tabindex="-1" aria-hidden="true">
        <?php if ( $thumb ) : ?>
        <div class="ladb-blog-teaser__img-wrap">
          <img src="<?= esc_url( $thumb ) ?>" alt="<?= esc_attr( $post->post_title ) ?>" class="ladb-blog-teaser__img" loading="lazy">
        </div>
        <?php else : ?>
        <div class="ladb-blog-teaser__img-wrap ladb-blog-teaser__img-wrap--placeholder"></div>
        <?php endif; ?>
      </a>
      <div class="ladb-blog-teaser__card-body">
        <?php if ( $cat_name ) : ?><span class="ladb-blog-teaser__cat"><?= $cat_name ?></span><?php endif; ?>
        <h3 class="ladb-blog-teaser__card-title">
          <a href="<?= esc_url( get_permalink( $post->ID ) ) ?>"><?= esc_html( $post->post_title ) ?></a>
        </h3>
        <div class="ladb-blog-teaser__meta">
          <span><?= esc_html( $date ) ?></span>
          <span><?= esc_html( $read_time ) ?> min de lecture</span>
        </div>
      </div>
    </article>
    <?php endforeach; ?>
  </div>
  <?php if ( $view_all_url ) : ?>
  <div class="ladb-blog-teaser__footer ladb-container">
    <a href="<?= esc_url( $view_all_url ) ?>" class="ladb-btn ladb-btn--primary"><?= esc_html( $view_all_text ) ?></a>
  </div>
  <?php endif; ?>
</section>
