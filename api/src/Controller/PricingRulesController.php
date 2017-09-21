<?php
namespace App\Controller;

use App\Controller\AppController;

/**
 * PricingRules Controller
 *
 * @property \App\Model\Table\PricingRulesTable $PricingRules
 */
class PricingRulesController extends AppController
{

    /**
     * Index method
     *
     * @return \Cake\Network\Response|null
     */
    public function index()
    {
        $this->paginate = [
            'contain' => ['Marketplaces']
        ];
        $pricingRules = $this->paginate($this->PricingRules);

        $this->set(compact('pricingRules'));
        $this->set('_serialize', ['pricingRules']);
    }

    /**
     * View method
     *
     * @param string|null $id Pricing Rule id.
     * @return \Cake\Network\Response|null
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function view($id = null)
    {
        $pricingRule = $this->PricingRules->get($id, [
            'contain' => ['Marketplaces']
        ]);

        $this->set('pricingRule', $pricingRule);
        $this->set('_serialize', ['pricingRule']);
    }

    /**
     * Add method
     *
     * @return \Cake\Network\Response|null Redirects on successful add, renders view otherwise.
     */
    public function add()
    {
        $pricingRule = $this->PricingRules->newEntity();
        if ($this->request->is('post')) {
            $pricingRule = $this->PricingRules->patchEntity($pricingRule, $this->request->getData());
            if ($this->PricingRules->save($pricingRule)) {
                $this->Flash->success(__('The pricing rule has been saved.'));

                return $this->redirect(['action' => 'index']);
            }
            $this->Flash->error(__('The pricing rule could not be saved. Please, try again.'));
        }
        $marketplaces = $this->PricingRules->Marketplaces->find('list', ['limit' => 200]);
        $this->set(compact('pricingRule', 'marketplaces'));
        $this->set('_serialize', ['pricingRule']);
    }

    /**
     * Edit method
     *
     * @param string|null $id Pricing Rule id.
     * @return \Cake\Network\Response|null Redirects on successful edit, renders view otherwise.
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    public function edit($id = null)
    {
        $pricingRule = $this->PricingRules->get($id, [
            'contain' => []
        ]);
        if ($this->request->is(['patch', 'post', 'put'])) {
            $pricingRule = $this->PricingRules->patchEntity($pricingRule, $this->request->getData());
            if ($this->PricingRules->save($pricingRule)) {
                $this->Flash->success(__('The pricing rule has been saved.'));

                return $this->redirect(['action' => 'index']);
            }
            $this->Flash->error(__('The pricing rule could not be saved. Please, try again.'));
        }
        $marketplaces = $this->PricingRules->Marketplaces->find('list', ['limit' => 200]);
        $this->set(compact('pricingRule', 'marketplaces'));
        $this->set('_serialize', ['pricingRule']);
    }

    /**
     * Delete method
     *
     * @param string|null $id Pricing Rule id.
     * @return \Cake\Network\Response|null Redirects to index.
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function delete($id = null)
    {
        $this->request->allowMethod(['post', 'delete']);
        $pricingRule = $this->PricingRules->get($id);
        if ($this->PricingRules->delete($pricingRule)) {
            $this->Flash->success(__('The pricing rule has been deleted.'));
        } else {
            $this->Flash->error(__('The pricing rule could not be deleted. Please, try again.'));
        }

        return $this->redirect(['action' => 'index']);
    }
}
