<?php
use Migrations\AbstractMigration;
use Cake\ORM\TableRegistry;

class UpdateMpProductUrls extends AbstractMigration
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
        $productsData = $productsTrackTable->find()->toArray();
        foreach($productsData as $product){
            $listingUrl = $this->generateListingUrl($product['listing_id'],$product['marketplace_id']);  

             $query = $productsTrackTable->query();
             $query->update()
             ->set(['listing_url' => $listingUrl])
             ->where(['id' => $product['id']])
             ->execute();

        }

    }

    public function generateListingUrl($listing_id,$marketplace_id){
        if($marketplace_id == 1){
            $url = 'http://www.amazon.in/dp/'.$listing_id;
        }else if($marketplace_id == 2){
            $url = 'https://www.flipkart.com/item/'.$listing_id;
        }else if($marketplace_id == 3){
            $url = 'https://www.snapdeal.com/search?keyword='.$listing_id;
        }else if($marketplace_id == 4){
            $url = 'https://paytm.com/shop/search?q='.$listing_id;
        }
        return $url;
    }
}
