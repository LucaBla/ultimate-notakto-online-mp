class Room < ApplicationRecord
  has_one :board
  validates_presence_of :board
end
