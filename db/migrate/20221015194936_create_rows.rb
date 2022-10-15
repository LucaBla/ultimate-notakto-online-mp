class CreateRows < ActiveRecord::Migration[7.0]
  def change
    create_table :rows do |t|
      t.belongs_to :sub_board
      t.timestamps
    end
  end
end
