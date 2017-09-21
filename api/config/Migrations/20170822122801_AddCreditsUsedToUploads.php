<?php
use Migrations\AbstractMigration;

class AddCreditsUsedToUploads extends AbstractMigration
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
        $table = $this->table('uploads');
        $table->addColumn('credits_used', 'integer', [
            'limit' => 11,
            'null' => false,
            'default' => 0
        ])->update();
    }
}
