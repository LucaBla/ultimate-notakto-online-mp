class CreateRooms < ActiveRecord::Migration[7.0]
  def change
    create_table :rooms do |t|
      t.json :state
      t.integer :player_count
      t.integer :player1
      t.integer :player2
      t.string :starting_player
      t.boolean :adjusted
      t.timestamps
    end
  end
end
