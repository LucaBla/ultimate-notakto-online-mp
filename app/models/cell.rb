class Cell < ApplicationRecord
  belongs_to :row
  has_one :piece
end
