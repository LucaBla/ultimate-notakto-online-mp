class SubBoard < ApplicationRecord
  #belongs_to :b_row
  #has_many :rows
  belongs_to :room

  before_validation(on: :create) do
    self.state = {
      0 => { 0 => nil, 1 => nil, 2 => nil },
      1 => { 0 => nil, 1 => nil, 2 => nil },
      2 => { 0 => nil, 1 => nil, 2 => nil }
    }
    self.lost = false
  end

  def move!(row, col, current_user)
    return if lost || current_user.id != room.active_player

    state[row.to_s][col.to_s] = :x

    room.swap_active_player

    save!

    self.lost = game_over?

    self.playable = false if game_over?

    save!

    room.set_playable_fields(row, col)

    [self.id, row, col]
  end

  def game_over?
    return true if three_in_a_row || three_in_a_col || three_in_a_diag

    false
  end

  def three_in_a_row()
    pieces = 0

    state.each do |row|
      row[1].each do |cell|
        if cell[1] == 'x'
          pieces += 1
          if pieces == 3
            return true
          end
        end
      end
      pieces = 0
    end
    false
  end

  def three_in_a_col()
    for i in 0..2
      if state['0'][i.to_s] == 'x' && state['1'][i.to_s] == 'x' && state['2'][i.to_s] == 'x'
        return true
      end
    end
    false
  end

  def three_in_a_diag()
    if (state['0']['0'] == 'x' && state['1']['1'] == 'x' && state['2']['2'] == 'x') ||
       (state['0']['2'] == 'x' && state['1']['1'] == 'x' && state['2']['0'] == 'x')
      return true
    end

    false
  end
end
