<?php
/**
 * Routes configuration
 *
 * In this file, you set up routes to your controllers and their actions.
 * Routes are very important mechanism that allows you to freely connect
 * different URLs to chosen controllers and their actions (functions).
 *
 * CakePHP(tm) : Rapid Development Framework (http://cakephp.org)
 * Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 *
 * Licensed under The MIT License
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 * @link          http://cakephp.org CakePHP(tm) Project
 * @license       http://www.opensource.org/licenses/mit-license.php MIT License
 */
use Cake\Core\Plugin;
use Cake\Routing\RouteBuilder;
use Cake\Routing\Router;
use Cake\Routing\Route\DashedRoute;
/**
 * The default class to use for all routes
 *
 * The following route classes are supplied with CakePHP and are appropriate
 * to set as the default:
 *
 * - Route
 * - InflectedRoute
 * - DashedRoute
 *
 * If no call is made to `Router::defaultRouteClass()`, the class used is
 * `Route` (`Cake\Routing\Route\Route`)
 *
 * Note that `Route` does not do any inflections on URLs which will result in
 * inconsistently cased URLs when used with `:plugin`, `:controller` and
 * `:action` markers.
 *
 */
Router::defaultRouteClass(DashedRoute::class);

Router::prefix('api', function ($routes) {
    $routes->extensions(['json', 'xml']);
    $routes->resources('Products');
    Router::connect('/api/products/all', ['controller' => 'Products', 'action' => 'fetch_products', 'prefix' => 'api']);
    Router::connect('/api/products/import', ['controller' => 'Products', 'action' => 'import_products', 'prefix' => 'api']);

    Router::connect('/api/products/export', ['controller' => 'Products', 'action' => 'export_products', 'prefix' => 'api']);

    Router::connect('/api/products/crawl', ['controller' => 'Products', 'action' => 'crawl_products', 'prefix' => 'api']);
    Router::connect('/api/products/test', ['controller' => 'Products', 'action' => 'testRequest', 'prefix' => 'api']);

    Router::connect('/api/products/info/:product_id', ['controller' => 'Products', 'action' => 'get_product_info', 'prefix' => 'api'],['pass' => ['product_id']]);

    Router::connect('/api/test/tracked/:marketplace_id', ['controller' => 'TestApi', 'action' => 'get_products', 'prefix' => 'api'],['pass' => ['marketplace_id']]);
    Router::connect('/api/test/crawl', ['controller' => 'TestApi', 'action' => 'start_crawl', 'prefix' => 'api']);

    $routes->resources('Users');
    Router::connect('/api/users/register', ['controller' => 'Users', 'action' => 'add', 'prefix' => 'api']);
    Router::connect('/api/users/token', ['controller' => 'Users', 'action' => 'token', 'prefix' => 'api']);
    Router::connect('/api/users/forgot-password', ['controller' => 'Users', 'action' => 'forgot_password', 'prefix' => 'api']);
    Router::connect('/api/users/reset-password', ['controller' => 'Users', 'action' => 'reset_password', 'prefix' => 'api']);

    Router::connect('/api/users/preferences', ['controller' => 'Users', 'action' => 'update_preferences', 'prefix' => 'api']);


    //microsite routes
    Router::connect('/api/microsite/register', ['controller' => 'Microsite', 'action' => 'register', 'prefix' => 'api']);
    Router::connect('/api/users/user-register', ['controller' => 'Users', 'action' => 'register_user', 'prefix' => 'api']);
    Router::connect('/api/users/verify-phonenumber', ['controller' => 'Users', 'action' => 'verify_phone_number', 'prefix' => 'api']);
    Router::connect('/api/users/resend-otp', ['controller' => 'Users', 'action' => 'resend_otp', 'prefix' => 'api']);
    Router::connect('/api/users/update-phone-number', ['controller' => 'Users', 'action' => 'update_phone_number', 'prefix' => 'api']);
    Router::connect('/api/users/import-dummy-data', ['controller' => 'Users', 'action' => 'import_dummy_data', 'prefix' => 'api']);

    //add seller id
    Router::connect('/api/seller/add-seller-id', ['controller' => 'Sellers', 'action' => 'add_seller_id', 'prefix' => 'api']);
    Router::connect('/api/seller/get-seller-ids', ['controller' => 'Sellers', 'action' => 'get_seller_ids', 'prefix' => 'api']);



    //$routes->resources('PricingRules');
    Router::connect('/api/pricingRules/all', ['controller' => 'PricingRules', 'action' => 'fetch_all', 'prefix' => 'api']);
    Router::connect('/api/pricingRules/details', ['controller' => 'PricingRules', 'action' => 'get_details', 'prefix' => 'api']);
    Router::connect('/api/pricingRules/fields', ['controller' => 'PricingRules', 'action' => 'get_fields', 'prefix' => 'api']);


    Router::connect('/api/uploads/all', ['controller' => 'Uploads', 'action' => 'fetch_all', 'prefix' => 'api']);
    Router::connect('/api/uploads/result/:upload_id', ['controller' => 'Uploads', 'action' => 'getResult', 'prefix' => 'api'],['pass' => ['upload_id']]);
    Router::connect('/api/uploads/get-file/:upload_id', ['controller' => 'Uploads', 'action' => 'getFile', 'prefix' => 'api'],['pass' => ['upload_id']]);

    Router::connect('/api/activities/product/:product_id', ['controller' => 'Activities', 'action' => 'fetch_all', 'prefix' => 'api'],['pass' => ['product_id']]);

    //Router::connect('/api/competitors/marketplace/:marketplace_id', ['controller' => 'Competitors', 'action' => 'fetch_all', 'prefix' => 'api'],['pass' => ['marketplace_id']]);

    Router::connect('/api/competitors/all', ['controller' => 'Competitors', 'action' => 'fetch_all', 'prefix' => 'api']);
    Router::connect('/api/competitors/products', ['controller' => 'Competitors', 'action' => 'get_products', 'prefix' => 'api']);
    Router::connect('/api/competitors/get-products', ['controller' => 'Competitors', 'action' => 'get_competitor_products', 'prefix' => 'api']);
    Router::connect('/api/competitors/violations', ['controller' => 'Competitors', 'action' => 'get_violations', 'prefix' => 'api']);

    Router::connect('/api/dashboard', ['controller' => 'Dashboard', 'action' => 'index', 'prefix' => 'api']);
    Router::connect('/api/dashboard/top-metrics', ['controller' => 'Dashboard', 'action' => 'getMetrics', 'prefix' => 'api']);
    Router::connect('/api/dashboard/marketplace-metrics', ['controller' => 'Dashboard', 'action' => 'getMarketplaceMetrics', 'prefix' => 'api']);
    Router::connect('/api/dashboard/trendchart', ['controller' => 'Dashboard', 'action' => 'getTrendchart', 'prefix' => 'api']);
    Router::connect('/api/dashboard/trend-metrics', ['controller' => 'Dashboard', 'action' => 'getTrendMetrics', 'prefix' => 'api']);
    Router::connect('/api/dashboard/last-day-metrics', ['controller' => 'Dashboard', 'action' => 'get24HourMetric', 'prefix' => 'api']);

    Router::connect('/api/airports', ['controller' => 'Airports', 'action' => 'index', 'prefix' => 'api']);

    Router::connect('/api/sellers/product/:product_id', ['controller' => 'Sellers', 'action' => 'getSellerData', 'prefix' => 'api'],['pass' => ['product_id']]);

    Router::connect('/api/sellers/product/:product_id/rank', ['controller' => 'Sellers', 'action' => 'getSellerRank', 'prefix' => 'api'],['pass' => ['product_id']]);

    Router::connect('/api/crawlResponse/save', ['controller' => 'CrawlResponse', 'action' => 'saveData', 'prefix' => 'api']);

    Router::connect('/api/sellers/product/:product_id/seller-price-trend', ['controller' => 'Sellers', 'action' => 'getSellerPriceTrend', 'prefix' => 'api'],['pass' => ['product_id']]);

    Router::connect('/api/product/details/:product_id', ['controller' => 'Products', 'action' => 'getSingleProductDetails', 'prefix' => 'api'],['pass' => ['product_id']]);




    $routes->fallbacks('InflectedRoute');

});


Router::prefix('api/v2', function ($routes) {
    $routes->extensions(['json', 'xml']);
    Router::connect('/api/v2/products/import', ['controller' => 'Products', 'action' => 'import_products', 'prefix' => 'api/v2']);
    Router::connect('/api/v2/products/update-product-seller', ['controller' => 'Products', 'action' => 'updateSellerIdForProducts', 'prefix' => 'api/v2']);

    $routes->fallbacks('InflectedRoute');
  });


Router::scope('/', function (RouteBuilder $routes) {
    /**
     * Here, we are connecting '/' (base path) to a controller called 'Pages',
     * its action called 'display', and we pass a param to select the view file
     * to use (in this case, src/Template/Pages/home.ctp)...
     */
    $routes->connect('/', ['controller' => 'Pages', 'action' => 'display', 'home']);
    /**
     * ...and connect the rest of 'Pages' controller's URLs.
     */
    $routes->connect('/pages/*', ['controller' => 'Pages', 'action' => 'display']);

    //Router::connect('/test/:marketplace_id', ['controller' => 'Test', 'action' => 'index'],['pass' => ['marketplace_id']]);


    /**
     * Connect catchall routes for all controllers.
     *
     * Using the argument `DashedRoute`, the `fallbacks` method is a shortcut for
     *    `$routes->connect('/:controller', ['action' => 'index'], ['routeClass' => 'DashedRoute']);`
     *    `$routes->connect('/:controller/:action/*', [], ['routeClass' => 'DashedRoute']);`
     *
     * Any route class can be used with this method, such as:
     * - DashedRoute
     * - InflectedRoute
     * - Route
     * - Or your own route class
     *
     * You can remove these routes once you've connected the
     * routes you want in your application.
     */
    $routes->fallbacks(DashedRoute::class);
});
/**
 * Load all plugin routes.  See the Plugin documentation on
 * how to customize the loading of plugin routes.
 */
Plugin::routes();
