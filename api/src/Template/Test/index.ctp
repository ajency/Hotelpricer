      <div class="jumbotron">
        <h1>Crawler Test</h1>
        <p>Run the crawler and update products data.</p>
        <!-- <p>
          <a class="btn btn-lg btn-primary start-crawler" href="javascript:void(0)" role="button">Start Crawler »</a>
        </p> -->
      </div>




      <div class="shell_container hide"></div>


      <div class="data_loader"><span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span> Loading... </div>

      <div class="marketplace_rows"></div>

      <!-- <table class="table table-striped table-bordered hide" id="products_table">
      <thead>
      <tr>
      <th>Listing ID</th>
      <th>Listing URL</th>
      <th>Last Updated</th>
      </tr>
      </thead>

      <tbody class="product_rows">

      </tbody>

      </table>   -->







<!-- <script type="text/x-jquery-tmpl" id="product-tmpl">
    {{each(i,product) products}}
        <tr>
            <td>${product.listing_id}</td>
            <td>${product.listing_url}</td>
            <td>${product.last_updated} <span class="glyphicon glyphicon-chevron-down more_data" aria-hidden="true" data-row="${i}"></span></td>
        </tr>

        <tr class="more_data_row_${i} hide">
        <td colspan="3">


              <table class="table table-condensed"">
              <thead>
              <caption><strong>Product Seller Data</strong></caption>
              <tr>
              <th>Seller Name</th>
              <th>Price</th>
              <th>Delivery</th>
              <th>Rating</th>
              <th>Rating Count</th>
              <th>Fullfilled by marketplace</th>
              <th>Covered Under Loyalty</th>
              <th>Buy Box</th>
              <th>Condition</th>
              <th>Last Updated</th>
              </tr>
              </thead>
              <tbody>
                  {{each(s,product_seller) product.seller_data}}
                  <tr>
                      <td>${product_seller.seller.seller_name}</td>
                      <td>${product_seller.price}</td>
                      <td>${product_seller.delivery}</td>
                      <td>${product_seller.rating}</td>
                      <td>${product_seller.rating_count}</td>
                      <td>${product_seller.fullfilled_by_marketplace}</td>
                      <td>${product_seller.covered_under_loyalty}</td>
                      <td>${product_seller.buy_box}</td>
                      <td>${product_seller.condition}</td>
                      <td>${product_seller.updated_on_readable}
                        {{if product_seller.more.length>0}}
                        <span class="glyphicon glyphicon glyphicon-plus-sign more_seller_data" aria-hidden="true" data-seller-row="${s}">
                        {{/if}}
                      </td>
                  </tr>

                    {{each(p,p_seller) product_seller.more}}
                    <tr class="more_seller_data_${s} hide">
                      <td>${product_seller.seller.seller_name}</td>
                      <td>${p_seller.price}</td>
                      <td>${p_seller.delivery}</td>
                      <td>${p_seller.rating}</td>
                      <td>${p_seller.rating_count}</td>
                      <td>${p_seller.fullfilled_by_marketplace}</td>
                      <td>${p_seller.covered_under_loyalty}</td>
                      <td>${p_seller.buy_box}</td>
                      <td>${p_seller.condition}</td>
                      <td>${p_seller.updated_on_readable}</td>
                    </tr>
                    {{/each}}


                  {{/each}}
              </tbody>
              </table>

        </td>
        </tr>
    {{/each}}
</script> -->






<script type="text/x-jquery-tmpl" id="product-marketplace-tmpl">
  {{each(i,products) productswithmarketplace}}


    <table class="table table-striped table-bordered" id="products_table_${i}">
      <thead>
       <caption><h2>${products[0]['marketplace']['title']}</h2> <a class="btn btn-small btn-info pull-right" href="javascript:void(0)" role="button" onClick="startCrawl(this,${i},false)">Run Crawler »</a></caption>
      <tr>
      <th>Listing ID</th>
      <th>Listing URL</th>
      <th>Last Updated</th>
      </tr>
      </thead>

      <tbody class="product_rows">

    {{each(i,product) products}}

        <tr>
            <td>${product.listing_id}</td>
            <td>${product.listing_url}</td>
            <td>
            ${product.last_updated} <span class="glyphicon glyphicon-chevron-down more_data" aria-hidden="true" data-row="${i}"></span>
            <a class="btn btn-small btn-default pull-right" href="javascript:void(0)" role="button" onClick="startCrawl(this,${product.id},true)">Crawl »</a>
            </td>
        </tr>

        <tr class="more_data_row_${i} hide">
        <td colspan="3">


              <table class="table table-condensed"">
              <thead>
              <caption><strong>Product Seller Data</strong></caption>
              <tr>
              <th>Seller Name</th>
              <th>Price</th>
              <th>Delivery</th>
              <th>Rating</th>
              <th>Rating Count</th>
              <th>Fullfilled by marketplace</th>
              <th>Covered Under Loyalty</th>
              <th>Buy Box</th>
              <th>Condition</th>
              <th>Last Updated</th>
              </tr>
              </thead>
              <tbody>
                  {{each(s,product_seller) product.seller_data}}
                  <tr>
                      <td>${product_seller.seller.seller_name}</td>
                      <td>${product_seller.price}</td>
                      <td>${product_seller.delivery}</td>
                      <td>${product_seller.rating}</td>
                      <td>${product_seller.rating_count}</td>
                      <td>${product_seller.fullfilled_by_marketplace}</td>
                      <td>${product_seller.covered_under_loyalty}</td>
                      <td>${product_seller.buy_box}</td>
                      <td>${product_seller.condition}</td>
                      <td>${product_seller.updated_on_readable}
                        {{if product_seller.more.length>0}}
                        <span class="glyphicon glyphicon glyphicon-plus-sign more_seller_data" aria-hidden="true" data-seller-row="${s}">
                        {{/if}}
                      </td>
                  </tr>

                    {{each(p,p_seller) product_seller.more}}
                    <tr class="more_seller_data_${s} hide">
                      <td>${product_seller.seller.seller_name}</td>
                      <td>${p_seller.price}</td>
                      <td>${p_seller.delivery}</td>
                      <td>${p_seller.rating}</td>
                      <td>${p_seller.rating_count}</td>
                      <td>${p_seller.fullfilled_by_marketplace}</td>
                      <td>${p_seller.covered_under_loyalty}</td>
                      <td>${p_seller.buy_box}</td>
                      <td>${p_seller.condition}</td>
                      <td>${p_seller.updated_on_readable}</td>
                    </tr>
                    {{/each}}


                  {{/each}}
              </tbody>
              </table>

        </td>
        </tr>
        {{/each}}

        </tbody>

      </table>
    {{/each}}

</script>



<script type="text/javascript">
var token = '<?php echo $token; ?>';

$("document").ready(function(){

    fetchProducts();

    $(".start-crawler").on('click',function(){
        startCrawl();
    });

    $(document).on('click','.more_data',function(){
        var row = $(this).attr('data-row');
        if($(this).hasClass('glyphicon-chevron-down')){
            $(this).removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
            $(this).parent().parent().parent().find(".more_data_row_"+row).removeClass('hide');
        }else{
            $(this).removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
            $(this).parent().parent().parent().find(".more_data_row_"+row).addClass('hide');
        }
    });

    $(document).on('click','.more_seller_data',function(){
        var row = $(this).attr('data-seller-row');
        if($(this).hasClass('glyphicon-plus-sign')){
            $(this).removeClass('glyphicon-plus-sign').addClass('glyphicon-minus-sign');
            $(this).parent().parent().parent().find(".more_seller_data_"+row).removeClass('hide');
        }else{
            $(this).removeClass('glyphicon-minus-sign').addClass('glyphicon-plus-sign');
            $(this).parent().parent().parent().find(".more_seller_data_"+row).addClass('hide');
        }
    });


});




fetchProducts = function(individual){

        //var getProductsUrl = '<?php echo $this->Url->build(['controller' => 'TestApi', 'action' => 'get_products', 'prefix' => 'api', 'marketplace_id' => $marketplace_id]);?>';
        var getProductsUrl = '<?php echo $this->Url->build(['controller' => 'Products', 'action' => 'all', 'prefix' => 'api', 'marketplace_id' => $marketplace_id]);?>';
        $.ajax({
                  url: getProductsUrl+'&limit=300',
                  type: 'get',
                  dataType: 'json',
                  data: {},
                  headers: {
                    'Authorization':'Bearer '+token,
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                  },
                  beforeSend: function(){
                    /*var loader = '<span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span> Crawling... ';
                    $(".start-crawler").html(loader).addClass('disabled');*/
                  },
                  success: function(response){
                    /*var product_tmpl = $('#product-tmpl').html();
                    $('#products_table tbody').empty();
                    $('#products_table tbody.product_rows').append($.tmpl(product_tmpl,{products : response.products}));
                    $("#products_table").removeClass('hide');
                    $(".data_loader").addClass('hide');
                    $(".start-crawler").text('Start Crawler »').removeClass('disabled');*/

                    var product_marketplace_tmpl = $('#product-marketplace-tmpl').html();
                    $('.marketplace_rows').empty();
                    $('.marketplace_rows').append($.tmpl(product_marketplace_tmpl,{productswithmarketplace : response.productswithmarketplaces}));
                    $(".data_loader").addClass('hide');
                    //$(".start-crawler").text('Start Crawler »').removeClass('disabled');


                  },
                  error: function(jXHR, textStatus, errorThrown){
                    console.log(errorThrown);
                    //$(".start-crawler").text('Start Crawler »').removeClass('disabled');
                  }
              });
    }



startCrawl = function(element,id,individual){
        var startCrawlUrl = '<?php echo $this->Url->build([ "controller" => "TestApi","action" => "start_crawl", 'prefix' => 'api']);?>';
        if(individual){
          var data = '{"product_id": '+id+'}';
        }else{
          var data = '{"marketplace_id": '+id+'}'
        }
        $.ajax({
                  url: startCrawlUrl,
                  type: 'post',
                  dataType: 'json',
                  data: data,
                  headers: {
                    'Authorization':'Bearer '+token,
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                  },
                  beforeSend: function(){
                    var loader = '<span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span> Crawling... ';
                    $(element).html(loader).addClass('disabled');
                  },
                  success: function(response){
                    if(response.success == 'yes'){
                        fetchProducts(individual);
                        $(".shell_container").removeClass('hide').html(response.message);
                        $(".shell_container").append('<div>Crawl Finished</div><div>Fetching new data..</div>');
                    }else{

                      if(individual){
                        $(element).text('Crawl »').removeClass('disabled');
                      }else{
                        $(element).text('Run Crawler »').removeClass('disabled');
                      }


                        $(".shell_container").removeClass('hide').html(response.message);
                        alert(response.message)
                    }

                  },
                  error: function(jXHR, textStatus, errorThrown){
                    console.log(errorThrown);
                    $(".start-crawler").text('Start Crawler »').removeClass('disabled');
                  }
              });
    }

</script>
