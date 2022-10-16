class Piece < ApplicationRecord
  belongs_to :cell
  after_create_commit -> { broadcast_replace_to "board_#{board.id}", partial: "boards/board", locals: { room: board.room }, target: "board_#{board.id}"}

  def board
    cell.row.sub_board.b_row.board
  end
end
