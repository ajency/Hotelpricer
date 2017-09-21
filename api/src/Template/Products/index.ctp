<?php
/**
  * @var \App\View\AppView $this
  */
?>
<nav class="large-3 medium-4 columns" id="actions-sidebar">
    <ul class="side-nav">
        <li class="heading"><?= __('Actions') ?></li>
        <li><?= $this->Html->link(__('New Product'), ['action' => 'add']) ?></li>
        <li><?= $this->Html->link(__('List Rules'), ['controller' => 'Rules', 'action' => 'index']) ?></li>
        <li><?= $this->Html->link(__('New Rule'), ['controller' => 'Rules', 'action' => 'add']) ?></li>
        <li><?= $this->Html->link(__('List Users'), ['controller' => 'Users', 'action' => 'index']) ?></li>
        <li><?= $this->Html->link(__('New User'), ['controller' => 'Users', 'action' => 'add']) ?></li>
    </ul>
</nav>
<div class="products index large-9 medium-8 columns content">
    <h3><?= __('Products') ?></h3>
    <table cellpadding="0" cellspacing="0">
        <thead>
            <tr>
                <th scope="col"><?= $this->Paginator->sort('id') ?></th>
                <th scope="col"><?= $this->Paginator->sort('marketplace_id') ?></th>
                <th scope="col"><?= $this->Paginator->sort('listing_id') ?></th>
                <th scope="col"><?= $this->Paginator->sort('sku_code') ?></th>
                <th scope="col"><?= $this->Paginator->sort('min') ?></th>
                <th scope="col"><?= $this->Paginator->sort('max') ?></th>
                <th scope="col"><?= $this->Paginator->sort('rule_id') ?></th>
                <th scope="col"><?= $this->Paginator->sort('product_family') ?></th>
                <th scope="col"><?= $this->Paginator->sort('status') ?></th>
                <th scope="col"><?= $this->Paginator->sort('user_id') ?></th>
                <th scope="col"><?= $this->Paginator->sort('created_at') ?></th>
                <th scope="col"><?= $this->Paginator->sort('last_updated') ?></th>
                <th scope="col" class="actions"><?= __('Actions') ?></th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($products as $product): ?>
            <tr>
                <td><?= $this->Number->format($product->id) ?></td>
                <td><?= $this->Number->format($product->marketplace_id) ?></td>
                <td><?= h($product->listing_id) ?></td>
                <td><?= h($product->sku_code) ?></td>
                <td><?= $this->Number->format($product->min) ?></td>
                <td><?= $this->Number->format($product->max) ?></td>
                <td><?= $product->has('rule') ? $this->Html->link($product->rule->id, ['controller' => 'Rules', 'action' => 'view', $product->rule->id]) : '' ?></td>
                <td><?= $this->Number->format($product->product_family) ?></td>
                <td><?= $this->Number->format($product->status) ?></td>
                <td><?= $product->has('user') ? $this->Html->link($product->user->id, ['controller' => 'Users', 'action' => 'view', $product->user->id]) : '' ?></td>
                <td><?= h($product->created_at) ?></td>
                <td><?= h($product->last_updated) ?></td>
                <td class="actions">
                    <?= $this->Html->link(__('View'), ['action' => 'view', $product->id]) ?>
                    <?= $this->Html->link(__('Edit'), ['action' => 'edit', $product->id]) ?>
                    <?= $this->Form->postLink(__('Delete'), ['action' => 'delete', $product->id], ['confirm' => __('Are you sure you want to delete # {0}?', $product->id)]) ?>
                </td>
            </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
    <div class="paginator">
        <ul class="pagination">
            <?= $this->Paginator->first('<< ' . __('first')) ?>
            <?= $this->Paginator->prev('< ' . __('previous')) ?>
            <?= $this->Paginator->numbers() ?>
            <?= $this->Paginator->next(__('next') . ' >') ?>
            <?= $this->Paginator->last(__('last') . ' >>') ?>
        </ul>
        <p><?= $this->Paginator->counter(['format' => __('Page {{page}} of {{pages}}, showing {{current}} record(s) out of {{count}} total')]) ?></p>
    </div>
</div>
