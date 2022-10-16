class Board < ApplicationRecord
  belongs_to :room
  has_many :b_rows
  broadcasts
end
