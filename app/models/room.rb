class Room < ApplicationRecord
  #has_one :board
  has_many :sub_boards
  #validates_presence_of :board

  #before_validation(on: :create) do
  #  self.state = {
  #    0 => { 0 => SubBoard.create.id, 1 => SubBoard.create.id, 2 => SubBoard.create.id },
  #    1 => { 0 => SubBoard.create.id, 1 => SubBoard.create.id, 2 => SubBoard.create.id },
  #    2 => { 0 => SubBoard.create.id, 1 => SubBoard.create.id, 2 => SubBoard.create.id }
  #  }
  #end

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
    return true if three_in_a_row || three_in_a_col || three_in_a_diag

    false
  end

  def three_in_a_row()
    lost_boards = 0

    state.each do |row|
      row[1].each do |sub_board|
        if sub_boards.find(sub_board[1]).lost == true
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

  def three_in_a_col()
    for i in 0..2
      if sub_boards.find(state['0'][i.to_s]).lost == true &&
         sub_boards.find(state['1'][i.to_s]).lost == true &&
         sub_boards.find(state['2'][i.to_s]).lost == true
        return true
      end
    end
    false
  end

  def three_in_a_diag()
    if (sub_boards.find(state['0']['0']).lost == true &&
        sub_boards.find(state['1']['1']).lost == true &&
        sub_boards.find(state['2']['2']).lost == true) ||
       (sub_boards.find(state['0']['2']).lost == true &&
        sub_boards.find(state['1']['1']).lost == true &&
        sub_boards.find(state['2']['0']).lost == true)
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
