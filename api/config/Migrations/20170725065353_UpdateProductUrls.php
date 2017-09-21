<?php
use Migrations\AbstractMigration;
use Cake\ORM\TableRegistry;

class UpdateProductUrls extends AbstractMigration
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

        $productsTrackTable = TableRegistry::get('ProductsToBeTracked');
        $productsData = $productsTrackTable->find()->where('marketplace_id',2)->toArray();
        foreach($productsData as $product){
            $listingUrl = $url = 'https://www.flipkart.com/item/'.$product['listing_id'];  

             $query = $productsTrackTable->query();
             $query->update()
             ->set(['listing_url' => $listingUrl])
             ->where(['id' => $product['id']])
             ->execute();

        }
    }


 
}
