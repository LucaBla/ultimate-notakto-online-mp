class Row < ApplicationRecord
  belongs_to :sub_board
  has_many :cells
end
