<?php
defined('ABSPATH') || exit;
/**
 * Inject LocalBusiness JSON-LD schema on every page.
 */
add_action('wp_head', function () {

    // ── Variables isolées (faciles à modifier) ──────────────────────────
    // URL dynamique : se cale toute seule sur le domaine courant (staging OU prod)
    $home = home_url('/');
    // Image : vraie photo raster (recommandé par Google). Si tu changes le hero, mets le bon fichier ici.
    $business_image = home_url('/wp-content/uploads/2026/06/vitrier-montpellier-verre-sur-mesure.jpg');
    // ────────────────────────────────────────────────────────────────────

    $schema = [
        '@context'        => 'https://schema.org',
        '@type'           => 'HomeAndConstructionBusiness',
        'name'            => 'Les Alchimistes du Bâtiment',
        'url'             => $home,
        'telephone'       => '+33686416925',
        'email'           => 'hello@lesalchimistesdubatiment.fr',
        'description'     => 'Artisan vitrier, serrurier et miroitier à Montpellier. Intervention en moins de 24h, garantie décennale, devis gratuit.',
        'address'         => [
            '@type'           => 'PostalAddress',
            'streetAddress'   => '17 avenue Pierre Adhémar',
            'addressLocality' => 'Montpellier',
            'postalCode'      => '34090',
            'addressCountry'  => 'FR',
        ],
        'geo'             => [
            '@type'     => 'GeoCoordinates',
            'latitude'  => 43.6119,
            'longitude' => 3.8772,
        ],
        'openingHoursSpecification' => [
            [
                '@type'    => 'OpeningHoursSpecification',
                'dayOfWeek' => ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
                'opens'    => '00:00',
                'closes'   => '23:59',
            ],
        ],
        'aggregateRating' => [
            '@type'       => 'AggregateRating',
            'ratingValue' => '5',
            'bestRating'  => '5',
            'worstRating' => '1',
            'ratingCount' => '47',
        ],
        'priceRange'         => '€€',
        'currenciesAccepted' => 'EUR',
        'paymentAccepted'    => 'Cash, Credit Card, Check, Insurance',
        'areaServed'         => 'Montpellier Métropole',
        'hasMap'             => 'https://www.google.com/maps/place/?q=place_id:ChIJ8X0xTCivthIRfuKvr7obfNo',
        'image'              => $business_image,
        'sameAs'             => [
            'https://www.facebook.com/profile.php?id=61570704484153',
            'https://www.instagram.com/lesalchimistesdubatiment/',
            'https://www.tiktok.com/@les.alchimistes.d',
        ],
    ];
    echo '<script type="application/ld+json">' . wp_json_encode($schema, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) . '</script>' . "\n";
}, 5);