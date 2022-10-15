class CreateBRows < ActiveRecord::Migration[7.0]
  def change
    create_table :b_rows do |t|
      t.belongs_to :board
      t.timestamps
    end
  end
end
