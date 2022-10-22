class CreateRooms < ActiveRecord::Migration[7.0]
  def change
    create_table :rooms do |t|
      t.string :code
      t.json :state
      t.integer :player_count, default: 0
      t.integer :player1
      t.integer :player2
      t.integer :active_player
      t.string :starting_player, default: '1'
      t.boolean :adjusted, default: false
      t.timestamps
    end
  end
end
