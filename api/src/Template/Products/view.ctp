<?php
/**
  * @var \App\View\AppView $this
  */
?>
<nav class="large-3 medium-4 columns" id="actions-sidebar">
    <ul class="side-nav">
        <li class="heading"><?= __('Actions') ?></li>
        <li><?= $this->Html->link(__('Edit Product'), ['action' => 'edit', $product->id]) ?> </li>
        <li><?= $this->Form->postLink(__('Delete Product'), ['action' => 'delete', $product->id], ['confirm' => __('Are you sure you want to delete # {0}?', $product->id)]) ?> </li>
        <li><?= $this->Html->link(__('List Products'), ['action' => 'index']) ?> </li>
        <li><?= $this->Html->link(__('New Product'), ['action' => 'add']) ?> </li>
        <li><?= $this->Html->link(__('List Rules'), ['controller' => 'Rules', 'action' => 'index']) ?> </li>
        <li><?= $this->Html->link(__('New Rule'), ['controller' => 'Rules', 'action' => 'add']) ?> </li>
        <li><?= $this->Html->link(__('List Users'), ['controller' => 'Users', 'action' => 'index']) ?> </li>
        <li><?= $this->Html->link(__('New User'), ['controller' => 'Users', 'action' => 'add']) ?> </li>
    </ul>
</nav>
<div class="products view large-9 medium-8 columns content">
    <h3><?= h($product->id) ?></h3>
    <table class="vertical-table">
        <tr>
            <th scope="row"><?= __('Listing Id') ?></th>
            <td><?= h($product->listing_id) ?></td>
        </tr>
        <tr>
            <th scope="row"><?= __('Sku Code') ?></th>
            <td><?= h($product->sku_code) ?></td>
        </tr>
        <tr>
            <th scope="row"><?= __('Rule') ?></th>
            <td><?= $product->has('rule') ? $this->Html->link($product->rule->id, ['controller' => 'Rules', 'action' => 'view', $product->rule->id]) : '' ?></td>
        </tr>
        <tr>
            <th scope="row"><?= __('User') ?></th>
            <td><?= $product->has('user') ? $this->Html->link($product->user->id, ['controller' => 'Users', 'action' => 'view', $product->user->id]) : '' ?></td>
        </tr>
        <tr>
            <th scope="row"><?= __('Id') ?></th>
            <td><?= $this->Number->format($product->id) ?></td>
        </tr>
        <tr>
            <th scope="row"><?= __('Marketplace Id') ?></th>
            <td><?= $this->Number->format($product->marketplace_id) ?></td>
        </tr>
        <tr>
            <th scope="row"><?= __('Min') ?></th>
            <td><?= $this->Number->format($product->min) ?></td>
        </tr>
        <tr>
            <th scope="row"><?= __('Max') ?></th>
            <td><?= $this->Number->format($product->max) ?></td>
        </tr>
        <tr>
            <th scope="row"><?= __('Product Family') ?></th>
            <td><?= $this->Number->format($product->product_family) ?></td>
        </tr>
        <tr>
            <th scope="row"><?= __('Status') ?></th>
            <td><?= $this->Number->format($product->status) ?></td>
        </tr>
        <tr>
            <th scope="row"><?= __('Created At') ?></th>
            <td><?= h($product->created_at) ?></td>
        </tr>
        <tr>
            <th scope="row"><?= __('Last Updated') ?></th>
            <td><?= h($product->last_updated) ?></td>
        </tr>
    </table>
</div>
