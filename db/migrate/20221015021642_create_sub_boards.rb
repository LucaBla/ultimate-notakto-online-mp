class CreateSubBoards < ActiveRecord::Migration[7.0]
  def change
    create_table :sub_boards do |t|
      #t.belongs_to :b_row
      t.belongs_to :room
      t.json :state
      t.boolean :lost
      t.boolean :playable, default: true
      t.timestamps
    end
  end
end
