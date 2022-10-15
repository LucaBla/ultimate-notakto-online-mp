class AddRoomToBoard < ActiveRecord::Migration[7.0]
  def change
    add_reference(:boards, :room)
  end
end
