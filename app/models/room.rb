class Room < ApplicationRecord
  has_many :sub_boards

  def set_playable_fields(row, col)
    playable_sub_board = sub_boards.find(state[row.to_s][col.to_s])

    if !playable_sub_board.lost
      sub_boards.each do |sub_board|
        updated_sub_board = sub_board
        if playable_sub_board != updated_sub_board
          updated_sub_board.playable = false
        else
          updated_sub_board.playable = true
        end
        updated_sub_board.save!
      end
    else
      sub_boards.where(lost: false).each do |sub_board|
        updated_sub_board = sub_board
        updated_sub_board.playable = true
        updated_sub_board.save!
      end
    end
  end

  def game_over?
    boards = sub_boards
    return true if three_in_a_row(boards) || three_in_a_col(boards) || three_in_a_diag(boards)

    false
  end

  def three_in_a_row(boards)
    lost_boards = 0

    [0, 3, 6].each do |i|
      (i + 0..i + 2).each do |j|
        if boards[j].lost == true
          lost_boards += 1
          if lost_boards == 3
            return true
          end
        end
      end
      lost_boards = 0
    end
    false
  end

  def three_in_a_col(boards)
    for i in 0..2
      if boards[i].lost == true &&
         boards[i + 3].lost == true &&
         boards[i + 6].lost == true
        return true
      end
    end
    false
  end

  def three_in_a_diag(boards)
    return  if boards[4].lost == false

    if (boards[0].lost == true &&
        boards[8].lost == true) ||
       (boards[2].lost == true &&
        boards[6].lost == true)
      return true
    end

    false
  end
#  const resetBoard = () => {
#    for(const row of board){
#      for(const cell of row){
#        cell.lost = false;
#        for(let i = 0; i < 3; i++){
#          for(let j = 0; j < 3; j++){
#            cell.removePiece(i, j);
#          }
#        }
#      }
#    }
#  }
#
#
#
#
#
#
#
#
#  const board = createBoard();
#  const playableSubBoard = null;
end
