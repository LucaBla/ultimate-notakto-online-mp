class CreateSubBoards < ActiveRecord::Migration[7.0]
  def change
    create_table :sub_boards do |t|
      t.belongs_to :b_row
      t.timestamps
    end
  end
end
