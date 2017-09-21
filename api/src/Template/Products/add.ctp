<?php
/**
  * @var \App\View\AppView $this
  */
?>
<nav class="large-3 medium-4 columns" id="actions-sidebar">
    <ul class="side-nav">
        <li class="heading"><?= __('Actions') ?></li>
        <li><?= $this->Html->link(__('List Products'), ['action' => 'index']) ?></li>
        <li><?= $this->Html->link(__('List Rules'), ['controller' => 'Rules', 'action' => 'index']) ?></li>
        <li><?= $this->Html->link(__('New Rule'), ['controller' => 'Rules', 'action' => 'add']) ?></li>
        <li><?= $this->Html->link(__('List Users'), ['controller' => 'Users', 'action' => 'index']) ?></li>
        <li><?= $this->Html->link(__('New User'), ['controller' => 'Users', 'action' => 'add']) ?></li>
    </ul>
</nav>
<div class="products form large-9 medium-8 columns content">
    <?= $this->Form->create($product) ?>
    <fieldset>
        <legend><?= __('Add Product') ?></legend>
        <?php
            echo $this->Form->control('marketplace_id');
            echo $this->Form->control('listing_id');
            echo $this->Form->control('sku_code');
            echo $this->Form->control('min');
            echo $this->Form->control('max');
            echo $this->Form->control('rule_id', ['options' => $rules]);
            echo $this->Form->control('product_family');
            echo $this->Form->control('status');
            echo $this->Form->control('user_id', ['options' => $users]);
            echo $this->Form->control('created_at');
            echo $this->Form->control('last_updated');
        ?>
    </fieldset>
    <?= $this->Form->button(__('Submit')) ?>
    <?= $this->Form->end() ?>
</div>
