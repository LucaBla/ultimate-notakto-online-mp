class CreateCells < ActiveRecord::Migration[7.0]
  def change
    create_table :cells do |t|
      t.belongs_to :row
      t.timestamps
    end
  end
end
