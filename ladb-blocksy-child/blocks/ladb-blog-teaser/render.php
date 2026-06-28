<?php
defined('ABSPATH') || exit;

$eyebrow    = esc_html($attributes['sectionEyebrow'] ?? 'Le blog');
$title      = esc_html($attributes['sectionTitle']   ?? 'Conseils & guides pratiques');
$intro      = esc_html($attributes['sectionIntro']   ?? '');
$cat_slug   = sanitize_key($attributes['categorySlug'] ?? '');
$count      = absint($attributes['postsCount']       ?? 4);
$all_url    = esc_url($attributes['allPostsUrl']     ?? '/blog/');
$all_label  = esc_html($attributes['allPostsLabel']  ?? 'Voir tous les articles →');

$count = max(1, min(8, $count));

$query_args = [
    'post_type'      => 'post',
    'post_status'    => 'publish',
    'posts_per_page' => $count,
    'orderby'        => 'date',
    'order'          => 'DESC',
    'no_found_rows'  => true,
];
if ($cat_slug) {
    $query_args['category_name'] = $cat_slug;
}

$posts = new WP_Query($query_args);
?>
<div class="ladb-blog" id="blog">
  <div class="ladb-blog__head">
    <div>
      <span class="ladb-eyebrow"><?php echo $eyebrow; ?></span>
      <h3><?php echo $title; ?></h3>
      <?php if ($intro): ?>
      <p><?php echo $intro; ?> <a href="<?php echo $all_url; ?>"><?php echo $all_label; ?></a></p>
      <?php endif; ?>
    </div>
  </div>

  <?php if ($posts->have_posts()): ?>
  <div class="ladb-blog__grid">
    <?php while ($posts->have_posts()): $posts->the_post();
      $thumb_url = get_the_post_thumbnail_url(null, 'medium_large');
      $cats      = get_the_category();
      $cat_name  = !empty($cats) ? esc_html($cats[0]->name) : '';
      $date      = get_the_date('j M Y');
      $read_time = max(1, round(str_word_count(wp_strip_all_tags(get_the_content())) / 200));
    ?>
    <a href="<?php the_permalink(); ?>" class="ladb-post">
      <?php if ($thumb_url): ?>
      <img
        class="ladb-post__img"
        src="<?php echo esc_url($thumb_url); ?>"
        alt="<?php echo esc_attr(get_the_title()); ?>"
        width="600" height="400"
        loading="lazy"
      />
      <?php endif; ?>
      <div class="ladb-post__overlay" aria-hidden="true"></div>
      <div class="ladb-post__body">
        <?php if ($cat_name): ?>
        <span class="ladb-post__cat"><?php echo $cat_name; ?></span>
        <?php endif; ?>
        <h4><?php the_title(); ?></h4>
        <span class="ladb-post__meta"><?php echo esc_html($date); ?> · <?php echo $read_time; ?> min de lecture</span>
      </div>
    </a>
    <?php endwhile; wp_reset_postdata(); ?>
  </div>
  <?php else: ?>
  <p class="ladb-blog__no-posts">
    Aucun article trouvé<?php echo $cat_slug ? ' dans la catégorie «&nbsp;' . esc_html($cat_slug) . '&nbsp;»' : ''; ?>.
    <a href="<?php echo $all_url; ?>" style="color:var(--copper-light)">Voir le blog →</a>
  </p>
  <?php endif; ?>
</div>
