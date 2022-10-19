class Room < ApplicationRecord
  has_many :sub_boards

  def build_sub_boards
    9.times do
      sub_boards.build
    end
  end

  def swap_active_player
    if self.active_player == player1
      self.active_player = player2
    else
      self.active_player = player1
    end
    save!
  end

  def get_winner(active_user)
    return player2 if active_user == player1

    player1
  end

  def set_starting_player
    player = starting_player
    if player == 'random'
      player = rand(1..2)
    end
    self.active_player = player1 if player == 1 || player == '1'
    self.active_player = player2 if player == 2 || player == '2'
  end

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

  def reset_room
    sub_boards.each do |sub_board|
      sub_board.state = {
        0 => { 0 => nil, 1 => nil, 2 => nil },
        1 => { 0 => nil, 1 => nil, 2 => nil },
        2 => { 0 => nil, 1 => nil, 2 => nil }
      }
      sub_board.lost = false
      sub_board.playable = true

      sub_board.save!
    end
    #self.adjusted = false removed until there is a settings modal after resetting
    self.reseted = true
  end

  def game_over?
    boards = sub_boards.order(id: :asc)
    return false if !three_in_a_diag(boards) && !three_in_a_col(boards) && !three_in_a_row(boards)

    true
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
end
