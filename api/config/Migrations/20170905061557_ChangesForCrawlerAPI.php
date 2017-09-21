<?php
use Migrations\AbstractMigration;

class ChangesForCrawlerAPI extends AbstractMigration
{
    /**
     * Change Method.
     *
     * More information on this method is available here:
     * http://docs.phinx.org/en/latest/migrations.html#the-change-method
     * @return void
     */
    public function change()
    {
        $product_seller_data_table = $this->table('product_seller_data');
        $products = $this->table('products');

        $product_seller_data_table->changeColumn('price', 'decimal', [
            'precision'=>'10',
            'scale'=>'1',
            'default' => NULL,
            'null' => true
        ]);

        $product_seller_data_table->changeColumn('buy_box', 'boolean', [
            'default' => NULL,
            'null' => true
        ]);

        $product_seller_data_table->changeColumn('delivery', 'string', [
            'default' => NULL,
            'null' => true,
            'limit' => 32,
        ]);

        $product_seller_data_table->update();
        $product_seller_data_table->removeColumn('active')->save();
        $product_seller_data_table->removeColumn('stockouts')->save();
        $product_seller_data_table->removeColumn('buy_box_ownership')->save();
        $product_seller_data_table->removeColumn('rating')->save();
        $product_seller_data_table->removeColumn('rating_count')->save();
        $product_seller_data_table->removeColumn('condition')->save();

        $products->changeColumn('first_crawl_succeeded', 'boolean', [
            'default' => NULL,
            'null' => true
        ]);

        $products->removeColumn('crawl_status')->save();
        $products->removeColumn('dirty')->save();
    }
}